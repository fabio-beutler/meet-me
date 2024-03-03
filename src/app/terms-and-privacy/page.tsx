export default function TermsAndPrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-8">
      <h1 className="text-2xl font-bold">Política de Privacidade</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-bold">1. Coleta de Dados</h2>
        <p>O aplicativo Meet Me coleta as seguintes informações:</p>
        <ul className="space-y-2">
          <li className="ml-4 list-disc">
            Escopo de Calendário do Google: Para permitir a marcação de reuniões no
            calendário do usuário, nosso aplicativo solicita acesso ao escopo de
            calendário do Google. Isso inclui informações sobre eventos, datas, horários e
            participantes.
          </li>
          <li className="ml-4 list-disc">
            Dados Públicos do Usuário: Coletamos dados públicos do usuário, como nome,
            endereço de e-mail e imagem de perfil, para personalizar a experiência do
            usuário e facilitar a identificação.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold">2. Uso das Informações</h2>
        <p>As informações coletadas são usadas exclusivamente para os seguintes fins:</p>
        <ul>
          <li className="ml-4 list-disc">
            Marcação de Reuniões: Utilizamos os dados do calendário do usuário para
            agendar reuniões e eventos conforme solicitado pelo usuário.
          </li>
          <li className="ml-4 list-disc">
            Personalização: Os dados públicos do usuário são usados para personalizar a
            interface do aplicativo e fornecer uma experiência mais relevante.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold">3. Compartilhamento de Dados</h2>
        <p>
          Nós <strong>não</strong> compartilhamos as informações do usuário com terceiros,
          exceto quando necessário para o funcionamento do aplicativo (por exemplo, com o
          Google para autenticação e acesso ao calendário).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold">4. Segurança</h2>
        <p>
          Tomamos medidas para proteger as informações do usuário, incluindo criptografia
          e acesso restrito aos dados.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold"> 5. Direitos do Usuário</h2>
        <p>O usuário tem o direito de:</p>
        <ul>
          <li className="ml-4 list-disc">Acessar suas informações pessoais.</li>
          <li className="ml-4 list-disc">Corrigir ou atualizar seus dados.</li>
          <li className="ml-4 list-disc">Solicitar a exclusão de seus dados.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold">6. Contato</h2>
        <p>
          Se você tiver alguma dúvida ou preocupação sobre nossa política de privacidade,
          entre em contato conosco em{' '}
          <a href="mailto:dev.fabiobeutler@gmail.com">dev.fabiobeutler@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
