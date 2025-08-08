// // src/pages/CatalogoAulas.tsx
// import React from "react";
// import styled from "styled-components";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import AulaCard from "../components/AulaCard"; 


// const aulas = [
//   {
//     title: "Etiqueta Digital",
//     duration: "1h00min",
//     img: "src/assets/carrossel/EtiquetaDigital.png",
//   },
//   {
//     title: "Marketing",
//     duration: "1h00min",
//     img: "src/assets/carrossel/Marketing.png",
//   },
//   {
//     title: "Finanças e Contabilidade",
//     duration: "1h00min",
//     img: "src/assets/carrossel/Financas.png",
//   },
//   {
//     title: "Conversação Profissional",
//     duration: "1h00min",
//     img: "src/assets/carrossel/Conversacao.png",
//   },
// ];

// const resolveImg = (p: string) => new URL(p, import.meta.url).href;

// const AulasPage = () => {
//   return (
//     <>
//       <Header />

//       <Container>
//         {/* Hero / Metodologia */}
//         <Hero>
//           <HeroTitle>Nossa Metodologia</HeroTitle>
//           <HeroText>
            // Na <strong>LinguaLab</strong>, você aprende de forma prática, dinâmica e personalizada.
            // Combinamos <em>microlearning</em>, imersões reais e feedback contínuo para acelerar sua
            // fluência com foco no que importa: <strong>performar em situações reais</strong> — reuniões,
            // apresentações, negociações e e-mails. A cada módulo você conquista resultados mensuráveis:
            // mais vocabulário técnico, melhor estrutura e segurança para se comunicar com clareza.
            // Tudo online, interativo e desenhado para o seu objetivo.
//           </HeroText>
//         </Hero>

//         {/* Blocos alternados */}
//         <Section>
//           {aulas.map((aula, idx) => {
//             const isReversed = idx % 2 === 1;
//             return (
//               <Row key={aula.title}>
//                 <CardCol $reversed={isReversed}>
//                   <AulaCard title={aula.title} img={resolveImg(aula.img)} />
//                 </CardCol>

//                 <TextCol $reversed={isReversed}>
//                   <LessonTitle>{aula.title}</LessonTitle>
//                   <LessonMeta>Duração: {aula.duration}</LessonMeta>
//                   <LessonDesc>
//                     {aula.title === "Etiqueta Digital" && (
//                       <>
//                         Domine a etiqueta de comunicação corporativa global: e-mails, chats, reuniões
//                         e apresentações. Evite ruídos culturais, ganhe objetividade e eleve a percepção
//                         sobre o seu trabalho com scripts e modelos que funcionam no dia a dia.
//                       </>
//                     )}
//                     {aula.title === "Marketing" && (
//                       <>
//                         Vocabulário e frameworks usados pelo mercado — de briefing a <em>post-mortem</em>.
//                         Você pratica <em>pitches</em>, relatórios e apresentações com estudos de caso reais,
//                         ganhando fluência para discutir métricas, funil e estratégia com confiança.
//                       </>
//                     )}
//                     {aula.title === "Finanças e Contabilidade" && (
//                       <>
//                         Inglês técnico para DRE, balanço, auditoria e <em>earnings calls</em>. Estruture
//                         análises, exponha hipóteses e discuta números com precisão, sem travar no
//                         vocabulário financeiro.
//                       </>
//                     )}
//                     {aula.title === "Conversação Profissional" && (
//                       <>
//                         Treine <strong>soft skills</strong> em inglês: abrir reuniões, alinhar expectativas,
//                         negociar e contar histórias que convencem. Fluência aplicada para brilhar em qualquer call.
//                       </>
//                     )}
//                   </LessonDesc>
//                 </TextCol>
//               </Row>
//             );
//           })}
//         </Section>
//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default AulasPage;

// src/pages/CatalogoAulas.tsx
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AulaCard from "../components/AulaCard2";

// IMPORTA AS IMAGENS (Vite faz o bundling e vira URL)
import EtiquetaDigitalImg from "../assets/carrossel/EtiquetaDigital.png";
import MarketingImg from "../assets/carrossel/Marketing.png";
import FinancasImg from "../assets/carrossel/Financas.png";
import ConversacaoImg from "../assets/carrossel/Conversacao.png";

const aulas = [
  { title: "Etiqueta Digital", duration: "7h30min", img: EtiquetaDigitalImg },
  { title: "Marketing", duration: "3h50min", img: MarketingImg },
  { title: "Finanças e Contabilidade", duration: "1h12min", img: FinancasImg },
  { title: "Conversação Profissional", duration: "2h40min", img: ConversacaoImg },
];

const AulasPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Hero>
          <HeroTitle>Nossa Metodologia</HeroTitle>
          <HeroText>
          Na <strong>LinguaLab</strong>, você aprende de forma prática, dinâmica e personalizada.
            Combinamos <em>microlearning</em>, imersões reais e feedback contínuo para acelerar sua
            fluência com foco no que importa: <strong>performar em situações reais</strong> — reuniões,
            apresentações, negociações e e-mails. A cada módulo você conquista resultados mensuráveis:
            mais vocabulário técnico, melhor estrutura e segurança para se comunicar com clareza.
            Tudo online, interativo e desenhado para o seu objetivo.
          </HeroText>
        </Hero>

        <Section>
          {aulas.map((aula, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <Row key={aula.title}>
                <CardCol $reversed={isReversed}>
                  <AulaCard title={aula.title} img={aula.img} />
                </CardCol>

                <TextCol $reversed={isReversed}>
                  <LessonTitle>{aula.title}</LessonTitle>
                  <LessonMeta>Duração: {aula.duration}</LessonMeta>
                   <LessonDesc>
                     {aula.title === "Etiqueta Digital" && (
                       <>
                         Domine a etiqueta de comunicação corporativa global: e-mails, chats, reuniões
                         e apresentações. Evite ruídos culturais, ganhe objetividade e eleve a percepção
                         sobre o seu trabalho com scripts e modelos que funcionam no dia a dia.
                       </>
                     )}
                     {aula.title === "Marketing" && (
                       <>
                         Vocabulário e frameworks usados pelo mercado — de briefing a <em>post-mortem</em>.
                         Você pratica <em>pitches</em>, relatórios e apresentações com estudos de caso reais,
                         ganhando fluência para discutir métricas, funil e estratégia com confiança.
                       </>
                     )}
                     {aula.title === "Finanças e Contabilidade" && (
                       <>
                         Inglês técnico para DRE, balanço, auditoria e <em>earnings calls</em>. Estruture
                         análises, exponha hipóteses e discuta números com precisão, sem travar no
                         vocabulário financeiro.
                       </>
                     )}
                     {aula.title === "Conversação Profissional" && (
                       <>
                         Treine <strong>soft skills</strong> em inglês: abrir reuniões, alinhar expectativas,
                         negociar e contar histórias que convencem. Fluência aplicada para brilhar em qualquer call.
                       </>
                     )}
                   </LessonDesc>
                </TextCol>
              </Row>
            );
          })}
        </Section>
      </Container>
      <Footer />
    </>
  );
};

export default AulasPage;


/* ========== STYLES ========== */

const Container = styled.div`
  font-family: "Poppins", sans-serif;
`;

const Hero = styled.section`
  padding: 3rem 1.5rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h1`
  color: #32004b;
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 0.75rem;
`;

const HeroText = styled.p`
  color: #3a3a3a;
  line-height: 1.7;
  font-size: 1rem;
  max-width: 820px;
  margin: 0.25rem auto 0;
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 1rem auto 3rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CardCol = styled.div<{ $reversed?: boolean }>`
  display: flex;
  justify-content: center;
  order: ${(p) => (p.$reversed ? 2 : 1)};

  @media (max-width: 900px) {
    order: 1; /* no mobile, card sempre antes do texto */
  }
`;

const TextCol = styled.div<{ $reversed?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  order: ${(p) => (p.$reversed ? 1 : 2)};

  @media (max-width: 900px) {
    order: 2;
  }
`;

const LessonTitle = styled.h2`
  color: #300244;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
`;

const LessonMeta = styled.span`
  color: #6a0dad;
  font-weight: 600;
  font-size: 0.95rem;
`;

const LessonDesc = styled.p`
  color: #3a3a3a;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.25rem 0 0;
`;
