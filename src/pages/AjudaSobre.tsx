import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import imgSobreAjuda from "../assets/HomePage/SobreAjuda.png";
import ContactForm from "@/components/ContactForm"; 

const PageWrapper = styled.div`
  background: #ffffff;
  font-family: "Poppins", sans-serif;
`;

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GradientTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 250, 251, 0) 100%);
  z-index: 1;
`;

const GradientBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, #ffffff 0%, rgba(255, 250, 251, 0) 100%);
  z-index: 1;
`;

const TextSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  color: #2d2d2d;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #4a0057;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  color: #4a0057;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #3a3a3a;
  margin-bottom: 1.5rem;
`;

const SobreAjuda = () => {
  return (
    <PageWrapper>
      <Header />
      <Container>
        <Image src={imgSobreAjuda} alt="Sobre e Ajuda" />
        <GradientTop />
        <GradientBottom />
      </Container>

      <TextSection>
        <Title>LinguaLab</Title>
        <Paragraph>
          A LinguaLab nasceu da visão empreendedora de Manuel Rodrigues, professor e especialista em idiomas com ampla experiência no ensino de inglês e espanhol voltado ao contexto corporativo. Após anos de atuação no mercado educacional, Manuel identificou a necessidade de um serviço mais dinâmico, personalizado e acessível para empresas e profissionais em busca de desenvolvimento linguístico de alto impacto.
        </Paragraph>

        <Subtitle>Enfatizando a experiência do cliente</Subtitle>
        <Paragraph>
          Cada etapa da jornada do aluno é pensada para ser eficiente, flexível e memorável. Sabemos que o tempo é um recurso valioso no ambiente corporativo, por isso oferecemos aulas personalizadas, com professores altamente qualificados, metodologias ativas e total adaptação à rotina dos clientes. A experiência do usuário é colocada no centro de tudo: desde o primeiro contato até o acompanhamento de progresso, priorizamos a escuta ativa, a simplicidade no acesso às aulas e a excelência no atendimento. Unimos tecnologia, conteúdo relevante e proximidade humana para transformar o aprendizado de idiomas em uma experiência fluida e de alto valor para profissionais e empresas.
        </Paragraph>
      </TextSection>
        <ContactForm />

      <Footer />
    </PageWrapper>
  );
};

export default SobreAjuda;
