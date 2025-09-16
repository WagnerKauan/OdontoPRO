# OdontoPRO

Projeto SaaS desenvolvido para digitalizar o gerenciamento de clínicas, permitindo agendamentos automáticos e otimizando o fluxo de atendimentos. Os clientes só podem agendar dentro dos horários disponíveis e sem sobreposição de horários.

---

## 🌟 Funcionalidades

- Autenticação via **Google** usando Auth.js.
- Dashboard completo onde os agendamentos caem automaticamente.
- Visualização detalhada de cada agendamento.
- Criação de lembretes e anotações com fotos da clínica.
- Configuração de horários de funcionamento da clínica.
- Controle de abertura e fechamento da clínica.
- Sistema de planos (**BASIC** e **PROFESSIONAL**) com teste gratuito de 3 dias.
- Controle de quantos serviços podem ser cadastrados de acordo com o plano.
- CRUD completo de serviços (nome, duração, preço).
- Cada clínica possui uma página dinâmica com informações e foto de perfil.
- Clientes só conseguem agendar horários livres e dentro do horário definido pela clínica.

---

## 💻 Stack

- **Frontend:** Next.js, TailwindCSS, Shadcn, TypeScript, React Query
- **Autenticação:** Auth.js (Google Sign-In)
- **Backend / Banco de dados:** Prisma, NeonDB
- **Pagamentos:** Stripe
- **Deploy:** Vercel

---

## ⚡ Dificuldades encontradas

- Entender como integrar e configurar o **Auth.js** no Next.js.
- Aplicar e configurar a **Stripe** para controle de planos e limites de serviços.

---

## 📚 Aprendizado

- Melhor organização da arquitetura do projeto.
- Planejamento e implementação da **lógica de negócio**.
- Melhoria na **reutilização de componentes** e práticas de frontend moderno.

---

## 🚀 Deploy

O projeto está hospedado na **Vercel** e pronto para uso em produção.

---

## 🔗 Observações

Este projeto é um ótimo exemplo de aplicação fullstack moderna, combinando Next.js, TypeScript e Prisma com integração de pagamentos e autenticação via OAuth, pensado para resolver problemas reais de gerenciamento de clínicas.

