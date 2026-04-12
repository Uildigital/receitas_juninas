import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Guia Junino Interativo",
  description: "Leia nossos termos de uso e condições de serviço.",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#2D1A12] py-20 px-6 selection:bg-primary/20">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="border-b border-primary/10 pb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary mb-4">Termos de Uso</h1>
          <p className="text-sm opacity-60 font-medium">Última atualização: 11 de Abril de 2026</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed font-medium opacity-80">
          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar a plataforma "Guia Junino Interativo", você concorda expressamente em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deve acessar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">2. Licença de Uso</h2>
            <p>
              O acesso ao conteúdo e às calculadoras interativas é pessoal, individual e intransferível. É estritamente proibido o compartilhamento de logins, senhas ou a redistribuição do conteúdo das receitas e estratégias de venda sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">3. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponível, incluindo textos, logotipos, códigos de sistema, calculadoras dinâmicas e fotografias, são de nossa propriedade intelectual exclusiva. A reprodução não autorizada constitui crime de violação de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">4. Limitação de Responsabilidade</h2>
            <p>
              O sistema fornece ferramentas de auxílio para precificação e sugestão de ingredientes. Os resultados financeiros variam de acordo com o esforço individual, qualidade da execução e condições do mercado local. Não garantimos faturamento específico apenas pelo uso da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">5. Política de Reembolso</h2>
            <p>
              Em conformidade com o Código de Defesa do Consumidor, oferecemos uma garantia incondicional de 7 (sete) dias. Caso não esteja satisfeito com o material, a solicitação de reembolso deve ser feita dentro deste prazo através da plataforma de pagamento original.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">6. Modificações</h2>
            <p>
              Reservamo-nos o direito de revisar estes termos a qualquer momento para refletir mudanças na legislação ou no serviço oferecido. O uso continuado após alterações constitui aceitação dos novos termos.
            </p>
          </section>
        </div>

        <footer className="pt-20 text-center opacity-30 text-[10px] font-black uppercase tracking-widest border-t border-primary/5">
          Elite Gourmet Platform &copy; 2024
        </footer>
      </div>
    </main>
  );
}
