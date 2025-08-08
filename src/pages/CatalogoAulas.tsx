// src/pages/CatalogoAulas.tsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import AulaCard from "../components/AulaCard";

type AulaPublica = {
  id: string;
  tipo: "particular" | "grupo";
  lingua: "ingles" | "espanhol";
  data: string;            // ISO
  creditos: number;
  titulo?: string | null;
  professor_id?: string | null;
  professor_nome?: string | null;
};

const API_URL = "http://localhost:8000/aulas-publicas-sem-login";

const AulasPage = () => {
  const [aulas, setAulas] = useState<AulaPublica[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAulas = async () => {
      setLoading(true);
      setErro(null);
      try {
        const res = await fetch(API_URL); // sem filtros, traz tudo (conforme seu backend)
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.detail || `Erro ${res.status}`);
        }
        const data: AulaPublica[] = await res.json();

        // Ordena por data crescente
        data.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
        setAulas(data);
      } catch (e: any) {
        setErro(e.message || "Erro ao carregar aulas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAulas();
  }, []);

  const tituloDerivado = (a: AulaPublica) => {
    if (a.titulo && a.titulo.trim() !== "") return a.titulo;
    const dataFmt = new Date(a.data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tipoLabel = a.tipo === "grupo" ? "Grupo" : "Particular";
    const linguaLabel = a.lingua === "ingles" ? "Inglês" : "Espanhol";
    return `Aula de ${linguaLabel} (${tipoLabel}) — ${dataFmt}`;
  };

  // Busca local (apenas pelo título derivado)
  const aulasRender = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();
    if (!termo) return aulas;
    return aulas.filter((a) => tituloDerivado(a).toLowerCase().includes(termo));
  }, [aulas, searchTerm]);

  return (
    <>
      <Header />

      <Container>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        {loading && <InfoBox>Carregando aulas…</InfoBox>}
        {erro && !loading && <ErrorBox>{erro}</ErrorBox>}

        {!loading && !erro && (
          <Grid>
            {aulasRender.map((aula) => (
              <AulaCard key={aula.id} title={tituloDerivado(aula)} />
            ))}
            {!aulasRender.length && (
              <InfoBox style={{ gridColumn: "1 / -1" }}>
                Nenhuma aula disponível.
              </InfoBox>
            )}
          </Grid>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default AulasPage;

// ======= Styled Components =======
const Container = styled.div`
  padding: 3rem 4vw;
  background: #fff;
  font-family: "Poppins", sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoBox = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 8px;
  background: #f3ecf7;
  color: #300244;
  font-weight: 600;
`;

const ErrorBox = styled(InfoBox)`
  background: #ffe8e8;
  color: #9b1c1c;
`;
