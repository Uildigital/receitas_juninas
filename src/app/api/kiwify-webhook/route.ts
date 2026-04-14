import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

// ─── Configurações ────────────────────────────────────────────────────────────
const PIXEL_ID = "1523944362485658";
const CAPI_TOKEN = "EAAPiJwUDYecBRJfmiFTRjm81OXDDyWEQHgi1a4RiYYKzD2kAV7LxyQFNJZBNW04DOI3vdvhYcJnTIW2l1X2kYiJRu5EPZC82Ofjb7fmgbKY0K0SVv6qr619h4zU0ZCaKnMlBYxRs9IPIuyzty6MdovWXLezxBLZBA9dxxZCEE4t1eEXuGHXKd2RiwY4DIi55TUgZDZD";
const WEBHOOK_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN || "receitas-juninas-webhook-2024";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** SHA-256 hash de uma string (para PII do Meta CAPI) */
function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** Normaliza telefone para formato E.164 sem o + (ex: 5511999999999) */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

// ─── Tipos do payload da Kiwify ───────────────────────────────────────────────
interface KiwifyPayload {
  event: string; // "order_approved" | "order_refunded" | "order_chargeback" | etc.
  order_id?: string;
  order_ref?: string;
  Customer?: {
    name?: string;
    email?: string;
    mobile?: string;
    CPF?: string;
    ip?: string;
  };
  Product?: {
    product_id?: string;
    product_name?: string;
  };
  Commissions?: {
    charge_amount?: string; // valor pago em centavos (string)
    currency?: string;
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Valida token de segurança da Kiwify (query param ?token=...)
    const tokenParam = req.nextUrl.searchParams.get("token");
    if (tokenParam !== WEBHOOK_TOKEN) {
      console.warn("[Kiwify Webhook] Token inválido:", tokenParam);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Lê o payload
    const payload: KiwifyPayload = await req.json();
    console.log("[Kiwify Webhook] Evento recebido:", payload.event, payload.order_id);

    // 3. Só processa vendas aprovadas
    if (payload.event !== "order_approved") {
      return NextResponse.json({ received: true, processed: false, reason: "Event not tracked" });
    }

    // 4. Extrai e hasheia dados do comprador
    const customer = payload.Customer || {};
    const email = customer.email ? sha256(customer.email) : undefined;
    const phone = customer.mobile ? sha256(normalizePhone(customer.mobile)) : undefined;

    // 5. Valor da venda em BRL
    const rawAmount = payload.Commissions?.charge_amount;
    const value = rawAmount
      ? parseFloat(rawAmount) / 100 // Kiwify envia em centavos
      : 47.00;

    // 6. Monta o evento para a Meta Conversions API
    const eventPayload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://receitas-juninas.webbookpro.com/",
          // ID único do pedido evita duplicação no Meta
          event_id: payload.order_id || payload.order_ref || `kiwify-${Date.now()}`,
          user_data: {
            ...(email && { em: email }),
            ...(phone && { ph: phone }),
            client_ip_address: customer.ip || req.headers.get("x-forwarded-for") || "127.0.0.1",
            client_user_agent: req.headers.get("user-agent") || "",
          },
          custom_data: {
            value,
            currency: "BRL",
            content_name: payload.Product?.product_name || "Receitas Juninas Interativo: 40 Receitas Premium com Check-Point",
            content_category: "Webbook",
            order_id: payload.order_id,
          },
        },
      ],
    };

    // 7. Envia para a Meta Conversions API
    const metaUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`;
    const metaResponse = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const metaResult = await metaResponse.json();
    console.log("[Kiwify Webhook] Meta CAPI response:", metaResult);

    if (!metaResponse.ok) {
      console.error("[Kiwify Webhook] Erro na Meta CAPI:", metaResult);
      return NextResponse.json(
        { success: false, error: "Meta CAPI error", details: metaResult },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      event: "Purchase",
      order_id: payload.order_id,
      meta_events_received: metaResult.events_received,
    });

  } catch (error: any) {
    console.error("[Kiwify Webhook] Erro inesperado:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET para confirmar que o endpoint está ativo (usado pela Kiwify para validar)
export async function GET() {
  return NextResponse.json({ status: "Kiwify webhook endpoint active ✅" });
}
