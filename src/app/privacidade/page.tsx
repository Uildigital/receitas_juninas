import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Guia Junino Interativo",
  description: "Conheça como protegemos seus dados e sua privacidade.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#2D1A12] py-20 px-6 selection:bg-primary/20">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="border-b border-primary/10 pb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary mb-4">Política de Privacidade</h1>
          <p className="text-sm opacity-60 font-medium">Última atualização: 11 de Abril de 2026</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed font-medium opacity-80">
          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">1. Coleta de Informações</h2>
            <p>
              Coletamos as informações necessárias para processar sua compra e entregar o acesso à nossa plataforma (nome, e-mail e telefone). Esses dados são processados de forma segura através dos nossos parceiros de pagamento certificados (Kiwify).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">2. Uso de Dados</h2>
            <p>
              Seus dados de contato são utilizados apenas para a entrega do conteúdo, suporte ao cliente e envio de comunicações importantes sobre atualizações do seu acesso vitalício. Não vendemos seus dados a terceiros em nenhuma circunstância.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">3. Pixel e Cookies</h2>
            <p>
              Utilizamos tecnologias como o Pixel do Facebook para entender o comportamento de navegação em nosso site e otimizar nossas campanhas publicitárias. Os cookies ajudam a lembrar sua sessão e garantir que o acesso à sua calculadora de lucro seja contínuo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">4. Segurança</h2>
            <p>
              Empregamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado e situações acidentais ou ilícitas de destruição, perda ou alteração.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4 text-primary">5. Seus Direitos</h2>
            <p>
              De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem o direito de solicitar o acesso, retificação ou exclusão de seus dados pessoais dos nossos registros a qualquer momento através do nosso canal de suporte.
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
