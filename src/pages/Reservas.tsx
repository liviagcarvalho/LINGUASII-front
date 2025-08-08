// src/pages/Reservas.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import HeaderLogado from "../components/HeaderLogado";
import Footer from "../components/Footer";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";

Modal.setAppElement("#root");

type AulaAPI = {
  id: string;
  data: string;           // ISO datetime
  creditos: number;
  lingua: "ingles" | "espanhol";
  tipo: "grupo" | "particular";
  titulo?: string;
  nome?: string;          // fallback se backend usar 'nome'
};

type Evento = {
  id: string;
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  extendedProps: {
    custo: number;
    lingua: AulaAPI["lingua"];
    tipo: AulaAPI["tipo"];
    titulo: string;
  };
};

const Reservas = () => {
  const { token } = useAuth();
  const [aulas, setAulas] = useState<Evento[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState<any>(null);

  // ====== NOVO: filtros ======
  const [filtros, setFiltros] = useState<{ lingua: "todos" | AulaAPI["lingua"]; tipo: "todos" | AulaAPI["tipo"] }>({
    lingua: "todos",
    tipo: "todos",
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as { name: "lingua" | "tipo"; value: any };
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => setFiltros({ lingua: "todos", tipo: "todos" });

  // ---- helpers ----
  const labelTipo = (t: AulaAPI["tipo"]) => (t === "grupo" ? "Em grupo" : "Particular");
  const labelLingua = (l: AulaAPI["lingua"]) => (l === "ingles" ? "Inglês" : "Espanhol");

  const getEventColors = (tipo: AulaAPI["tipo"], lingua: AulaAPI["lingua"]) => {
    if (tipo === "grupo" && lingua === "ingles")   return { bg: "#2e7d32", border: "#2e7d32", text: "#ffffff" };
    if (tipo === "grupo" && lingua === "espanhol") return { bg: "#ad1457", border: "#ad1457", text: "#ffffff" };
    if (tipo === "particular" && lingua === "ingles")   return { bg: "#1976d2", border: "#1976d2", text: "#ffffff" };
    return { bg: "#ef6c00", border: "#ef6c00", text: "#ffffff" };
  };

  // ---- carregar aulas disponíveis (todas dos professores) ----
  const buscarAulas = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8000/aulas-publicas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: AulaAPI[] = await res.json();

      if (!res.ok) {
        alert((data as any)?.detail || "Erro ao carregar aulas");
        return;
      }

      const eventosFormatados: Evento[] = data.map((aula) => {
        const titulo = aula.titulo || aula.nome || "Aula";
        const { bg, border, text } = getEventColors(aula.tipo, aula.lingua);
        return {
          id: aula.id,
          title: titulo,
          start: aula.data,
          backgroundColor: bg,
          borderColor: border,
          textColor: text,
          extendedProps: {
            custo: aula.creditos,
            lingua: aula.lingua,
            tipo: aula.tipo,
            titulo,
          },
        };
      });

      setAulas(eventosFormatados);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar aulas.");
    }
  }, [token]);

  useEffect(() => {
    buscarAulas();
  }, [buscarAulas]);

  const abrirModalReserva = (arg: EventClickArg) => {
    setAulaSelecionada(arg.event);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAulaSelecionada(null);
  };

  const confirmarReserva = async () => {
    if (!token || !aulaSelecionada) return;
    try {
      const resp = await fetch(`http://localhost:8000/reservar/${aulaSelecionada.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();

      if (!resp.ok) {
        alert(data.detail || "Erro ao reservar aula.");
        return;
      }

      // créditos atualizados para o PerfilAluno
      const novosCreditos = data?.creditos_atualizados;
      if (typeof novosCreditos === "number") {
        window.dispatchEvent(new CustomEvent("creditos-atualizados", { detail: novosCreditos }));
      }

      // Se for PARTICULAR, remove do calendário local (lotou);
      // Se for GRUPO, recarrega do servidor (pode ter lotado).
      const tipo = aulaSelecionada?.extendedProps?.tipo as AulaAPI["tipo"];
      if (tipo === "particular") {
        setAulas((prev) => prev.filter((ev) => ev.id !== aulaSelecionada.id));
      } else {
        await buscarAulas();
      }

      alert(`Reserva confirmada! Créditos restantes: ${novosCreditos ?? "atualizados"}`);
      fecharModal();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // ====== NOVO: filtrar aulas conforme filtros selecionados ======
  const aulasFiltradas = useMemo(() => {
    return aulas.filter((ev) => {
      const linguaOk = filtros.lingua === "todos" || ev.extendedProps.lingua === filtros.lingua;
      const tipoOk = filtros.tipo === "todos" || ev.extendedProps.tipo === filtros.tipo;
      return linguaOk && tipoOk;
    });
  }, [aulas, filtros]);

  // Renderização custom do conteúdo do evento
  const renderEventContent = (arg: EventContentArg) => {
    const tipo = arg.event.extendedProps["tipo"] as AulaAPI["tipo"];
    const lingua = arg.event.extendedProps["lingua"] as AulaAPI["lingua"];
    return (
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontWeight: 700 }}>{arg.event.title}</div>
        <div style={{ fontSize: "0.78rem", opacity: 0.95 }}>
          {labelTipo(tipo)} • {labelLingua(lingua)}
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderLogado />

      <Container>
        {/* ====== NOVO: Barra de filtros ====== */}
        <FilterBar>
          <FilterGroup>
            <label htmlFor="lingua">Idioma</label>
            <select name="lingua" id="lingua" value={filtros.lingua} onChange={handleFiltroChange}>
              <option value="todos">Todos</option>
              <option value="ingles">Inglês</option>
              <option value="espanhol">Espanhol</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label htmlFor="tipo">Tipo</label>
            <select name="tipo" id="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
              <option value="todos">Todos</option>
              <option value="particular">Particular</option>
              <option value="grupo">Em grupo</option>
            </select>
          </FilterGroup>

          <ClearButton onClick={limparFiltros}>Limpar</ClearButton>
        </FilterBar>

        <Title>Reservar Aulas</Title>

        <Legend>
          <LegendItem color="#2e7d32">Grupo • Inglês</LegendItem>
          <LegendItem color="#ad1457">Grupo • Espanhol</LegendItem>
          <LegendItem color="#1976d2">Particular • Inglês</LegendItem>
          <LegendItem color="#ef6c00">Particular • Espanhol</LegendItem>
        </Legend>

        <Calendario>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={false}
            editable={false}
            height="auto"
            slotMinTime="05:00:00"
            slotMaxTime="22:00:00"
            events={aulasFiltradas}   
            eventClick={abrirModalReserva}
            eventContent={renderEventContent}
            locale="pt-br"
            allDaySlot={false}
            nowIndicator={true}
            eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
          />
        </Calendario>
      </Container>

      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        style={{
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "430px",
            background: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            fontFamily: "Poppins",
            zIndex: 9999,
          },
          overlay: {
            zIndex: 9998,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <h2 style={{ marginBottom: "0.75rem", color: "#32004b" }}>Confirmar reserva</h2>

        <p><strong>Título:</strong> {aulaSelecionada?.extendedProps?.titulo}</p>
        <p>
          <strong>Tipo:</strong> {labelTipo(aulaSelecionada?.extendedProps?.tipo)}{" "}
          — <strong>Idioma:</strong> {labelLingua(aulaSelecionada?.extendedProps?.lingua)}
        </p>
        <p>
          <strong>Data/Horário:</strong>{" "}
          {aulaSelecionada?.start
            ? new Date(aulaSelecionada.start).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "--"}
        </p>
        <p><strong>Custo:</strong> {aulaSelecionada?.extendedProps?.custo} créditos</p>

        <ModalButtons>
          <button onClick={confirmarReserva}>Confirmar</button>
          <button onClick={fecharModal} className="outline">Cancelar</button>
        </ModalButtons>
      </Modal>

      <Footer />
    </>
  );
};

export default Reservas;

// ===== Styled Components =====
const Container = styled.div`
  padding: 2rem 3rem;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #32004b;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

/* ====== NOVO: estilos da barra de filtros ====== */
const FilterBar = styled.div`
  background: rgba(106, 13, 173, 0.06);
  border: 1px solid #e6d6f3;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  margin: 0 auto 1rem auto;
  max-width: 1000px;

  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    color: #4b007d;
    font-weight: 600;
    font-size: 0.95rem;
  }

  select {
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
    min-width: 150px;
    background: #fff;
  }
`;

const ClearButton = styled.button`
  background: #6a0dad;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(0.95);
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

const LegendItem = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  &:before {
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: ${(p) => p.color};
    display: inline-block;
  }
`;

const Calendario = styled.div`
  .fc {
    font-family: "Poppins", sans-serif;
  }

  .fc-toolbar-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #32004b;
  }

  .fc-button {
    background-color: #4b007d !important;
    border: none !important;
    border-radius: 6px !important;
  }

  .fc-daygrid-event,
  .fc-timegrid-event {
    border: none;
    font-size: 0.85rem;
  }

  .fc-timegrid-event .fc-event-time {
    font-weight: 600;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;

  button {
    background-color: #4b007d;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;

    &.outline {
      background: white;
      color: #4b007d;
      border: 2px solid #4b007d;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`;
