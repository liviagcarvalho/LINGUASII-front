import styled from "styled-components";

const SectionContainer = styled.section`
  width: 100%;
  margin-top: 0;
  min-height: 450px;
  background: linear-gradient(to bottom, #300244 3%, #2f0147 80%, #fffafb 100%);
  color: white;
  padding: 1rem 0rem 6rem 1rem;
  text-align: center;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  padding: 0 1rem;
  gap: 2rem;
  box-sizing: border-box;
`;

const StatItem = styled.div`
  flex: 1 1 200px;
  min-width: 150px;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  h3 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #e2c6f1;
    margin-bottom: 0.5rem;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
`;

const MissaoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
`;

const MissaoTexto = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  opacity: 0.95;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
`;


const MissaoSection = () => {
  return (
    <SectionContainer>
      <StatsGrid>
        <StatItem>
          <h3>15K+</h3>
          <p>Alunos</p>
        </StatItem>
        <StatItem>
          <h3>35</h3>
          <p>Tutores Qualificados</p>
        </StatItem>
        <StatItem>
          <h3>95%</h3>
          <p>Sucesso</p>
        </StatItem>
        <StatItem>
          <h3>16</h3>
          <p>Anos de experiência</p>
        </StatItem>
      </StatsGrid>

      <MissaoTitle>Nossa Missão</MissaoTitle>
      <MissaoTexto>
        Mais do que ensinar idiomas, queremos abrir portas para novas oportunidades,
        conectar culturas e impulsionar trajetórias pessoais e profissionais no mundo globalizado.
      </MissaoTexto>
    </SectionContainer>
  );
};

export default MissaoSection;
