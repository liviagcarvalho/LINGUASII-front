import React, { useState } from "react";
import styled from "styled-components";
import Headerlogado from "../components/HeaderLogado";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import AulaCard from "../components/AulaCard";
import HeaderLogado from "../components/HeaderLogado";

const aulasFake = [
  {
    title: "Apresentações De Alto Impacto",
    img: "https://images.unsplash.com/photo-1612832021082-d3e03d4cf3b3",
    tipo: "Grupo",
    idioma: "Inglês",
    bestSeller: true,
  },
  {
    title: "Marketing",
    img: "https://images.unsplash.com/photo-1556761175-129418cb2dfe",
    tipo: "Particular",
    idioma: "Espanhol",
    bestSeller: true,
  },
  {
    title: "Saúde E Life Sciences",
    img: "https://images.unsplash.com/photo-1581091012184-7f097b1b1d0d",
    tipo: "Grupo",
    idioma: "Inglês",
    bestSeller: true,
  },
  {
    title: "Etiqueta Digital",
    img: "https://images.unsplash.com/photo-1522199710521-72d69614c702",
    tipo: "Particular",
    idioma: "Espanhol",
    bestSeller: true,
  },
];

const AulasPageLogado = () => {
  const [tipo, setTipo] = useState("Todos");
  const [idioma, setIdioma] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const aulasFiltradas = aulasFake.filter((aula) => {
    const matchTipo = tipo === "Todos" || aula.tipo === tipo;
    const matchIdioma = idioma === "Todos" || aula.idioma === idioma;
    const matchBusca = aula.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTipo && matchIdioma && matchBusca;
  });

  return (
    <>
      <HeaderLogado />

      <Container>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <FiltrosContainer>
          <Titulo>FILTROS</Titulo>
          <SelectGroup>
            <SelectWrapper>
              <Label>Tipo:</Label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option>Todos</option>
                <option>Grupo</option>
                <option>Particular</option>
              </select>
            </SelectWrapper>
            <SelectWrapper>
              <Label>Idioma:</Label>
              <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
                <option>Todos</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </SelectWrapper>
          </SelectGroup>
        </FiltrosContainer>

        <Grid>
          {aulasFiltradas.map((aula, index) => (
            <AulaCard
              key={index}
              title={aula.title}
              img={aula.img}
              bestSeller={aula.bestSeller}
            />
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default AulasPageLogado;

// ======= Styled Components =======
const Container = styled.div`
  padding: 3rem 4vw;
  background: #fff;
  font-family: "Poppins", sans-serif;
`;

const Titulo = styled.h2`
  color: #300244;
  font-weight: 800;
  font-size: 1.2rem;
  margin-right: 1.5rem;
`;

const FiltrosContainer = styled.div`
  background: #e2d8e6;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #300244;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;
