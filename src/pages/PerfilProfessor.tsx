// // src/pages/PerfilProfessor.tsx
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import FundoUser from "../assets/User/FundoUser.png";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
// import { EventClickArg } from "@fullcalendar/core";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// type AulaEvent = {
//   id: string;
//   title: string;
//   start: string;
//   extendedProps: {
//     tipo: "grupo" | "particular";
//     lingua?: "ingles" | "espanhol";
//   };
//   classNames?: string[];
// };

// const PerfilProf = () => {
//   const { user, logout, token } = useAuth();
//   const navigate = useNavigate();

//   const [events, setEvents] = useState<AulaEvent[]>([]);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
//   const [dataSelecionada, setDataSelecionada] = useState<string>("");
//   const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);

//   const [formulario, setFormulario] = useState({
//     titulo: "",
//     tipo: "particular",
//     lingua: "ingles",
//     imagem: "",
//     repetir: "nenhum",
//     repetirAte: ""
//   });

//   useEffect(() => {
//     if (!user) return;
//     if (!user.is_professor) navigate("/");
//   }, [user, navigate]);

//   useEffect(() => {
//     const carregarAulas = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch("http://localhost:8000/minhas-aulas", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           console.error(data.detail);
//           return;
//         }

//         const eventosConvertidos: AulaEvent[] = data.map((aula: any) => {
//           const tipo = (aula.tipo as "grupo" | "particular") ?? "particular";
//           return {
//             id: aula.id,
//             title: aula.titulo || "Aula",
//             start: aula.data,
//             extendedProps: {
//               tipo,
//               lingua: aula.lingua,
//             },
//             classNames: [tipo === "grupo" ? "evento--grupo" : "evento--particular"],
//           };
//         });

//         setEvents(eventosConvertidos);
//       } catch (err) {
//         console.error("Erro ao carregar aulas:", err);
//       }
//     };

//     carregarAulas();
//   }, [token]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const abrirModal = (arg: DateClickArg) => {
//     // formato YYYY-MM-DDTHH:MM
//     setDataSelecionada(arg.dateStr.slice(0, 16));
//     setModalAberto(true);
//   };

//   const abrirModalDeletar = (arg: EventClickArg) => {
//     setEventoSelecionado(arg.event);
//     setModalDeletarAberto(true);
//   };

//   const fecharModal = () => setModalAberto(false);
//   const fecharModalDeletar = () => setModalDeletarAberto(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormulario({ ...formulario, [e.target.name]: e.target.value });
//   };

//   const criarAula = async () => {
//     if (!user || !token) return;

//     if (!formulario.titulo.trim()) {
//       alert("Por favor, insira um título para a aula.");
//       return;
//     }

//     const aulasParaCriar: Date[] = [];
//     const dataInicial = new Date(dataSelecionada);
//     const repetir = formulario.repetir;
//     const repetirAte = formulario.repetirAte ? new Date(formulario.repetirAte) : null;

//     if (repetir !== "nenhum" && repetirAte) {
//       let atual = new Date(dataInicial);
//       while (atual <= repetirAte) {
//         aulasParaCriar.push(new Date(atual));
//         if (repetir === "diario") {
//           atual.setDate(atual.getDate() + 1);
//         } else if (repetir === "semanal") {
//           atual.setDate(atual.getDate() + 7);
//         }
//       }
//     } else {
//       aulasParaCriar.push(dataInicial);
//     }

//     try {
//       for (const data of aulasParaCriar) {
//         const response = await fetch("http://localhost:8000/aulas", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             titulo: formulario.titulo,
//             tipo: formulario.tipo,
//             lingua: formulario.lingua,
//             // Convertendo para UTC-3 conforme seu comentário original
//             data: new Date(data.getTime() - 3 * 60 * 60 * 1000).toISOString(),
//             professor_id: user.sub,
//             alunos_ids: [],
//             imagem: formulario.imagem,
//           }),
//         });

//         const dataRes = await response.json();

//         if (!response.ok) {
//           alert(dataRes.detail || "Erro ao criar aula");
//           return;
//         }

//         const tipo = formulario.tipo as "grupo" | "particular";

//         setEvents((prev) => [
//           ...prev,
//           {
//             id: dataRes.id,
//             title: formulario.titulo,
//             start: data.toISOString(),
//             extendedProps: {
//               tipo,
//               lingua: formulario.lingua as "ingles" | "espanhol",
//             },
//             classNames: [tipo === "grupo" ? "evento--grupo" : "evento--particular"],
//           },
//         ]);
//       }

//       fecharModal();
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao conectar com o servidor.");
//     }
//   };

//   const deletarAula = async (deletarRepetidas: boolean) => {
//     if (!eventoSelecionado || !token) return;

//     const aulaId = eventoSelecionado.id;

//     try {
//       const url = deletarRepetidas
//         ? `http://localhost:8000/aulas/${aulaId}?repetir=true`
//         : `http://localhost:8000/aulas/${aulaId}`;

//       const response = await fetch(url, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         alert(error.detail || "Erro ao deletar aula.");
//         return;
//       }

//       if (deletarRepetidas) {
//         const deletedIds: string[] = await response.json();
//         setEvents((prev) => prev.filter((ev) => !deletedIds.includes(ev.id)));
//       } else {
//         setEvents((prev) => prev.filter((ev) => ev.id !== aulaId));
//       }

//       fecharModalDeletar();
//     } catch (err) {
//       console.error(err);
//       alert("Erro ao conectar com o servidor.");
//     }
//   };

//   // === RENDER CUSTOMIZADO DO EVENTO ===
//   // Mostra: horário (timeText) + título + badge do tipo
//   const renderEvento = (info: any) => {
//     const tipo = info.event.extendedProps?.tipo as "grupo" | "particular";
//     const tipoLabel = tipo === "grupo" ? "Grupo" : "Particular";

//     return (
//       <div className="evento__conteudo">
//         <div className="evento__linha1">{info.timeText}</div>
//         <div className="evento__linha2">
//           <strong>{info.event.title}</strong>
//           <span className={`badge ${tipo === "grupo" ? "badge--grupo" : "badge--particular"}`}>
//             {tipoLabel}
//           </span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Banner>
//         <img src={FundoUser} alt="Fundo Perfil" />
//         <OverlayText>Bem-vindo, {user?.username}!</OverlayText>
//       </Banner>
  
//       <MainContent>
//         <LogoutButton onClick={handleLogout}>
//           <FiLogOut size={20} />
//           <span>Sair</span>
//         </LogoutButton>
  
//         <CalendarioWrapper>
//           <AddButton onClick={() => setModalAberto(true)}>+</AddButton>
//           <Calendario>
//             <FullCalendar
//               plugins={[timeGridPlugin, interactionPlugin]}
//               initialView="timeGridWeek"
//               selectable={true}
//               editable={false}
//               height="auto"
//               slotMinTime="05:00:00"
//               slotMaxTime="22:00:00"
//               events={events}
//               dateClick={abrirModal}
//               eventClick={abrirModalDeletar}
//               locale="pt-br"
//               eventContent={renderEvento}
//               eventClassNames={(arg) =>
//                 arg.event.extendedProps?.tipo === "grupo"
//                   ? ["evento--grupo"]
//                   : ["evento--particular"]
//               }
//             />
//           </Calendario>
//         </CalendarioWrapper>
//       </MainContent>

//       {/* Modal Criar Aula */}
//       <Modal
//         isOpen={modalAberto}
//         onRequestClose={fecharModal}
//         style={{
//           content: {
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "420px",
//             background: "#fff",
//             borderRadius: "12px",
//             padding: "2rem",
//             fontFamily: "Poppins",
//             zIndex: 9999,
//           },
//           overlay: {
//             zIndex: 9998,
//             backgroundColor: "rgba(0, 0, 0, 0.4)",
//           },
//         }}
//       >
//         <h2 style={{ marginBottom: "1rem" }}>Criar nova aula</h2>

//         <FormGroup>
//           <label htmlFor="titulo">Título da Aula:</label>
//           <input
//             type="text"
//             name="titulo"
//             value={formulario.titulo}
//             onChange={handleInputChange}
//             placeholder="Ex: Conversação - Intermediário"
//           />
//         </FormGroup>

//         <FormGroup>
//           <label htmlFor="dataSelecionada">Data e Hora:</label>
//           <input
//             type="datetime-local"
//             name="dataSelecionada"
//             value={dataSelecionada}
//             onChange={(e) => setDataSelecionada(e.target.value)}
//           />
//         </FormGroup>

//         <FormGroup>
//           <label htmlFor="tipo">Tipo:</label>
//           <select name="tipo" value={formulario.tipo} onChange={handleInputChange}>
//             <option value="particular">Particular</option>
//             <option value="grupo">Grupo</option>
//           </select>
//         </FormGroup>

//         <FormGroup>
//           <label htmlFor="lingua">Língua:</label>
//           <select name="lingua" value={formulario.lingua} onChange={handleInputChange}>
//             <option value="ingles">Inglês</option>
//             <option value="espanhol">Espanhol</option>
//           </select>
//         </FormGroup>

//         <FormGroup>
//           <label htmlFor="imagem">Imagem (URL):</label>
//           <input
//             type="text"
//             name="imagem"
//             value={formulario.imagem}
//             onChange={handleInputChange}
//             placeholder="https://..."
//           />
//         </FormGroup>

//         <FormGroup>
//           <label htmlFor="repetir">Repetir:</label>
//           <select name="repetir" value={formulario.repetir} onChange={handleInputChange}>
//             <option value="nenhum">Nenhum</option>
//             <option value="diario">Todos os dias</option>
//             <option value="semanal">A cada 7 dias</option>
//           </select>
//         </FormGroup>

//         {formulario.repetir !== "nenhum" && (
//           <FormGroup>
//             <label htmlFor="repetirAte">Repetir até (data final):</label>
//             <input
//               type="date"
//               name="repetirAte"
//               value={formulario.repetirAte}
//               onChange={handleInputChange}
//             />
//           </FormGroup>
//         )}

//         <ModalButtons>
//           <button onClick={criarAula}>Criar Aula</button>
//           <button onClick={fecharModal}>Cancelar</button>
//         </ModalButtons>
//       </Modal>

//       {/* Modal Deletar Aula */}
//       <Modal
//         isOpen={modalDeletarAberto}
//         onRequestClose={fecharModalDeletar}
//         style={{
//           content: {
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "380px",
//             background: "#fff",
//             borderRadius: "12px",
//             padding: "2rem",
//             fontFamily: "Poppins",
//             zIndex: 9999,
//             textAlign: "center",
//           },
//           overlay: {
//             zIndex: 9998,
//             backgroundColor: "rgba(0, 0, 0, 0.4)",
//           },
//         }}
//       >
//         <h3>Deseja deletar esta aula?</h3>
//         <p style={{ marginTop: "0.5rem" }}>{eventoSelecionado?.title}</p>

//         <ModalButtons style={{ flexDirection: "column", gap: "0.8rem", marginTop: "1.5rem" }}>
//           <button onClick={() => deletarAula(false)}>Somente esta aula</button>
//           <button onClick={() => deletarAula(true)}>Esta e todas as futuras aulas repetidas</button>
//           <button onClick={fecharModalDeletar} style={{ backgroundColor: "#ccc", color: "#333" }}>
//             Cancelar
//           </button>
//         </ModalButtons>
//       </Modal>
//     </>
//   );
// };

// export default PerfilProf;

// // ======= Styled Components Extras =======

// const Banner = styled.div`
//   position: relative;
//   height: 280px;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const OverlayText = styled.h1`
//   position: absolute;
//   top: 2rem;
//   left: 3rem;
//   color: white;
//   font-size: 2rem;
//   font-weight: 700;
// `;

// const MainContent = styled.div`
//   padding: 2rem 3rem;
//   font-family: "Poppins", sans-serif;
// `;

// const CalendarioWrapper = styled.div`
//   position: relative;
// `;

// const AddButton = styled.button`
//   position: absolute;
//   right: 0;
//   top: -2.5rem;
//   background-color: #4b007d;
//   color: white;
//   font-size: 1.6rem;
//   border: none;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   cursor: pointer;
//   margin-bottom: 10rem;

//   &:hover {
//     background-color: #6a1b9a;
//   }
// `;

// const Calendario = styled.div`
//   .fc {
//     font-family: "Poppins", sans-serif;
//   }

//   .fc-toolbar-title {
//     font-size: 1.3rem;
//     font-weight: 600;
//     color: #32004b;
//   }

//   .fc-button {
//     background-color: #4b007d !important;
//     border: none !important;
//     border-radius: 6px !important;
//   }

//   /* Remove cor default pra usar nossas classes */
//   .fc-daygrid-event,
//   .fc-timegrid-event {
//     border: none;
//     font-size: 0.9rem;
//   }

//   /* Container interno do evento */
//   .evento__conteudo {
//     display: flex;
//     flex-direction: column;
//     gap: 2px;
//     padding: 4px 6px;
//   }
//   .evento__linha1 {
//     font-size: 0.8rem;
//     opacity: 0.9;
//   }
//   .evento__linha2 {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     line-height: 1.2;
//   }

//   /* Badges e cores por tipo */
//   .badge {
//     font-size: 0.7rem;
//     padding: 2px 6px;
//     border-radius: 999px;
//     background: rgba(255,255,255,0.2);
//     border: 1px solid rgba(255,255,255,0.4);
//   }

//   /* Fundo do evento por tipo */
//   .evento--grupo {
//     background-color: #1976d2 !important; /* azul para grupo */
//     color: #fff !important;
//   }
//   .evento--particular {
//     background-color: #2e7d32 !important; /* verde para particular */
//     color: #fff !important;
//   }

//   .badge--grupo {
//     background: rgba(255,255,255,0.15);
//     border-color: rgba(255,255,255,0.35);
//   }
//   .badge--particular {
//     background: rgba(255,255,255,0.15);
//     border-color: rgba(255,255,255,0.35);
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1rem;

//   label {
//     margin-bottom: 0.4rem;
//     font-weight: 600;
//     color: #4b007d;
//   }

//   select,
//   input {
//     padding: 0.6rem;
//     border-radius: 8px;
//     border: 1px solid #ccc;
//     font-size: 1rem;
//   }
// `;

// const ModalButtons = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 1.5rem;

//   button {
//     background-color: #4b007d;
//     color: white;
//     padding: 0.6rem 1.2rem;
//     border: none;
//     border-radius: 8px;
//     cursor: pointer;

//     &:hover {
//       background-color: #6a1b9a;
//     }
//   }
// `;

// const LogoutButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   background: none;
//   border: none;
//   color: #39004d;
//   font-weight: bold;
//   font-size: 1.2rem;
//   cursor: pointer;
//   margin-bottom: 2rem;
//   transition: color 0.2s ease;

//   &:hover {
//     color: #520066;
//   }
// `;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FundoUser from "../assets/User/FundoUser.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg, EventClickArg } from "@fullcalendar/interaction";
import Modal from "react-modal";

Modal.setAppElement("#root");

type AulaEvent = {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    tipo: "grupo" | "particular";
    lingua?: "ingles" | "espanhol";
    link_meet?: string | null;
  };
  classNames?: string[];
};

const PerfilProf = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<AulaEvent[]>([]);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [eventoSelecionado, setEventoSelecionado] = useState<AulaEvent | null>(null);

  const [formCriar, setFormCriar] = useState({
    titulo: "",
    tipo: "particular",
    lingua: "ingles",
    repetir: "nenhum",
    repetirAte: "",
    link_meet: "",
  });

  const [formEditar, setFormEditar] = useState({
    titulo: "",
    data: "",
    tipo: "particular",
    lingua: "ingles",
    link_meet: "",
  });

  useEffect(() => {
    if (!user) return;
    if (!user.is_professor) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const carregarAulas = async () => {
      if (!token) return;
      try {
        const response = await fetch("http://localhost:8000/minhas-aulas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          console.error(data.detail);
          return;
        }
        const eventosConvertidos: AulaEvent[] = data.map((aula: any) => {
          const tipo = (aula.tipo as "grupo" | "particular") ?? "particular";
          return {
            id: aula.id,
            title: aula.titulo || "Aula",
            start: aula.data,
            extendedProps: {
              tipo,
              lingua: aula.lingua,
              link_meet: aula.link_meet ?? null,
            },
            classNames: [tipo === "grupo" ? "evento--grupo" : "evento--particular"],
          };
        });
        setEvents(eventosConvertidos);
      } catch (err) {
        console.error("Erro ao carregar aulas:", err);
      }
    };
    carregarAulas();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // === CRIAR ===
  const abrirModalCriar = (arg?: DateClickArg) => {
    const dateStr = arg ? arg.dateStr.slice(0, 16) : "";
    setDataSelecionada(dateStr);
    setModalCriarAberto(true);
  };
  const fecharModalCriar = () => setModalCriarAberto(false);

  const handleInputCriar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormCriar({ ...formCriar, [e.target.name]: e.target.value });
  };

  const criarAula = async () => {
    if (!user || !token) return;
    if (!formCriar.titulo.trim()) {
      alert("Por favor, insira um título para a aula.");
      return;
    }

    const aulasParaCriar: Date[] = [];
    const dataInicial = dataSelecionada ? new Date(dataSelecionada) : new Date();
    const { repetir, repetirAte } = formCriar;

    if (repetir !== "nenhum" && repetirAte) {
      let atual = new Date(dataInicial);
      const limite = new Date(repetirAte);
      while (atual <= limite) {
        aulasParaCriar.push(new Date(atual));
        if (repetir === "diario") atual.setDate(atual.getDate() + 1);
        else if (repetir === "semanal") atual.setDate(atual.getDate() + 7);
      }
    } else {
      aulasParaCriar.push(dataInicial);
    }

    try {
      for (const data of aulasParaCriar) {
        const response = await fetch("http://localhost:8000/aulas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            titulo: formCriar.titulo,
            tipo: formCriar.tipo,
            lingua: formCriar.lingua,
            // Mantido seu ajuste original no POST
            data: new Date(data.getTime() - 3 * 60 * 60 * 1000).toISOString(),
            professor_id: user.sub,
            alunos_ids: [],
            link_meet: formCriar.link_meet || null,
          }),
        });

        const dataRes = await response.json();
        if (!response.ok) {
          alert(dataRes.detail || "Erro ao criar aula");
          return;
        }

        const tipo = formCriar.tipo as "grupo" | "particular";
        setEvents((prev) => [
          ...prev,
          {
            id: dataRes.id,
            title: formCriar.titulo,
            start: data.toISOString(),
            extendedProps: {
              tipo,
              lingua: formCriar.lingua as "ingles" | "espanhol",
              link_meet: formCriar.link_meet || null,
            },
            classNames: [tipo === "grupo" ? "evento--grupo" : "evento--particular"],
          },
        ]);
      }
      fecharModalCriar();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // === EDITAR ===
  const abrirModalEditar = (arg: EventClickArg) => {
    const ev = arg.event;
    const tipo = (ev.extendedProps?.tipo as "grupo" | "particular") ?? "particular";
    const lingua = (ev.extendedProps?.lingua as "ingles" | "espanhol") ?? "ingles";
    const link_meet = (ev.extendedProps?.link_meet as string | null) ?? "";

    setEventoSelecionado({
      id: ev.id,
      title: ev.title,
      start: ev.startStr,
      extendedProps: { tipo, lingua, link_meet },
      classNames: ev.classNames,
    });

    // Ajuste apenas para exibir no input (datetime-local espera horário local)
    setFormEditar({
      titulo: ev.title || "",
      data: ev.start
        ? new Date(ev.start.getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
        : "",
      tipo,
      lingua,
      link_meet: link_meet || "",
    });

    setModalEditarAberto(true);
  };

  const fecharModalEditar = () => setModalEditarAberto(false);

  const handleInputEditar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
  };

  const salvarEdicao = async () => {
    if (!token || !eventoSelecionado) return;

    const aulaId = eventoSelecionado.id;
    try {
      const response = await fetch(`http://localhost:8000/aulas/${aulaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: formEditar.titulo || null,
          tipo: formEditar.tipo,
          lingua: formEditar.lingua,
          // >>> Sem -3h no PATCH. Envia ISO diretamente a partir do input local.
          data: formEditar.data ? new Date(formEditar.data).toISOString() : null,
          link_meet: formEditar.link_meet || null,
        }),
      });

      const dataRes = await response.json();
      if (!response.ok) {
        alert(dataRes.detail || "Erro ao editar aula.");
        return;
      }

      // Atualiza no calendário
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === aulaId
            ? {
                id: aulaId,
                title: dataRes.aula.titulo || "Aula",
                start: dataRes.aula.data,
                extendedProps: {
                  tipo: dataRes.aula.tipo as "grupo" | "particular",
                  lingua: dataRes.aula.lingua as "ingles" | "espanhol",
                  link_meet: dataRes.aula.link_meet ?? null,
                },
                classNames: [
                  dataRes.aula.tipo === "grupo" ? "evento--grupo" : "evento--particular",
                ],
              }
            : ev
        )
      );

      fecharModalEditar();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // === DELETAR ===
  const abrirModalDeletar = () => setModalDeletarAberto(true);
  const fecharModalDeletar = () => setModalDeletarAberto(false);

  const deletarAula = async (deletarRepetidas: boolean) => {
    if (!eventoSelecionado || !token) return;
    const aulaId = eventoSelecionado.id;

    try {
      const url = deletarRepetidas
        ? `http://localhost:8000/aulas/${aulaId}?repetir=true`
        : `http://localhost:8000/aulas/${aulaId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.detail || "Erro ao deletar aula.");
        return;
      }

      setEvents((prev) => prev.filter((ev) => ev.id !== aulaId));
      fecharModalDeletar();
      fecharModalEditar();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // === RENDER CUSTOM DO EVENTO ===
  const renderEvento = (info: any) => {
    const tipo = info.event.extendedProps?.tipo as "grupo" | "particular";
    const tipoLabel = tipo === "grupo" ? "Grupo" : "Particular";
    return (
      <div className="evento__conteudo">
        <div className="evento__linha1">{info.timeText}</div>
        <div className="evento__linha2">
          <strong>{info.event.title}</strong>
          <span className={`badge ${tipo === "grupo" ? "badge--grupo" : "badge--particular"}`}>
            {tipoLabel}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Banner>
        <img src={FundoUser} alt="Fundo Perfil" />
        <OverlayText>Bem-vindo, {user?.username}!</OverlayText>
      </Banner>

      <MainContent>
        <LogoutButton onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Sair</span>
        </LogoutButton>

        <CalendarioWrapper>
          <AddButton onClick={() => abrirModalCriar()}>+</AddButton>
          <Calendario>
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              editable={false}
              height="auto"
              slotMinTime="05:00:00"
              slotMaxTime="22:00:00"
              events={events}
              dateClick={abrirModalCriar}
              eventClick={abrirModalEditar}
              locale="pt-br"
              eventContent={renderEvento}
              eventClassNames={(arg) =>
                arg.event.extendedProps?.tipo === "grupo"
                  ? ["evento--grupo"]
                  : ["evento--particular"]
              }
            />
          </Calendario>
        </CalendarioWrapper>
      </MainContent>

      {/* Modal Criar */}
      <Modal
        isOpen={modalCriarAberto}
        onRequestClose={fecharModalCriar}
        style={{
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "460px",
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            fontFamily: "Poppins",
            zIndex: 9999,
          },
          overlay: { zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.4)" },
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Criar nova aula</h2>

        <FormGroup>
          <label htmlFor="titulo">Título da Aula</label>
          <input
            type="text"
            name="titulo"
            value={formCriar.titulo}
            onChange={handleInputCriar}
            placeholder="Ex: Conversação - Intermediário"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="dataSelecionada">Data e Hora</label>
          <input
            type="datetime-local"
            name="dataSelecionada"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="tipo">Tipo</label>
          <select name="tipo" value={formCriar.tipo} onChange={handleInputCriar}>
            <option value="particular">Particular</option>
            <option value="grupo">Grupo</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="lingua">Língua</label>
          <select name="lingua" value={formCriar.lingua} onChange={handleInputCriar}>
            <option value="ingles">Inglês</option>
            <option value="espanhol">Espanhol</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="link_meet">Link do Meet (opcional)</label>
          <input
            type="text"
            name="link_meet"
            value={formCriar.link_meet}
            onChange={handleInputCriar}
            placeholder="https://meet.google.com/..."
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="repetir">Repetir</label>
          <select name="repetir" value={formCriar.repetir} onChange={handleInputCriar}>
            <option value="nenhum">Nenhum</option>
            <option value="diario">Todos os dias</option>
            <option value="semanal">A cada 7 dias</option>
          </select>
        </FormGroup>

        {formCriar.repetir !== "nenhum" && (
          <FormGroup>
            <label htmlFor="repetirAte">Repetir até</label>
            <input
              type="date"
              name="repetirAte"
              value={formCriar.repetirAte}
              onChange={handleInputCriar}
            />
          </FormGroup>
        )}

        <ModalButtons>
          <button onClick={criarAula}>Criar Aula</button>
          <button onClick={fecharModalCriar}>Cancelar</button>
        </ModalButtons>
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modalEditarAberto}
        onRequestClose={fecharModalEditar}
        style={{
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "460px",
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            fontFamily: "Poppins",
            zIndex: 9999,
          },
          overlay: { zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.4)" },
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Editar aula</h2>

        <FormGroup>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            value={formEditar.titulo}
            onChange={handleInputEditar}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="data">Data e Hora</label>
          <input
            type="datetime-local"
            name="data"
            value={formEditar.data}
            onChange={handleInputEditar}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="tipo">Tipo</label>
          <select name="tipo" value={formEditar.tipo} onChange={handleInputEditar}>
            <option value="particular">Particular</option>
            <option value="grupo">Grupo</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="lingua">Língua</label>
          <select name="lingua" value={formEditar.lingua} onChange={handleInputEditar}>
            <option value="ingles">Inglês</option>
            <option value="espanhol">Espanhol</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="link_meet">Link do Meet (opcional)</label>
          <input
            type="text"
            name="link_meet"
            value={formEditar.link_meet}
            onChange={handleInputEditar}
            placeholder="https://meet.google.com/..."
          />
        </FormGroup>

        <ModalButtons style={{ gap: "0.6rem" }}>
          <button onClick={salvarEdicao}>Salvar alterações</button>
          <button onClick={abrirModalDeletar} style={{ backgroundColor: "#b00020" }}>
            Excluir
          </button>
          <button onClick={fecharModalEditar} style={{ backgroundColor: "#ccc", color: "#333" }}>
            Cancelar
          </button>
        </ModalButtons>
      </Modal>

      {/* Modal Deletar */}
      <Modal
        isOpen={modalDeletarAberto}
        onRequestClose={fecharModalDeletar}
        style={{
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "380px",
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            fontFamily: "Poppins",
            zIndex: 9999,
            textAlign: "center",
          },
          overlay: { zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.4)" },
        }}
      >
        <h3>Deseja deletar esta aula?</h3>
        <p style={{ marginTop: "0.5rem" }}>{eventoSelecionado?.title}</p>

        <ModalButtons style={{ flexDirection: "column", gap: "0.8rem", marginTop: "1.5rem" }}>
          <button onClick={() => deletarAula(false)}>Somente esta aula</button>
          <button onClick={() => deletarAula(true)}>Esta e todas as futuras aulas repetidas</button>
          <button onClick={fecharModalDeletar} style={{ backgroundColor: "#ccc", color: "#333" }}>
            Cancelar
          </button>
        </ModalButtons>
      </Modal>
    </>
  );
};

export default PerfilProf;

// ======= Styled Components =======

const Banner = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const OverlayText = styled.h1`
  position: absolute;
  top: 2rem;
  left: 3rem;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const MainContent = styled.div`
  padding: 2rem 3rem;
  font-family: "Poppins", sans-serif;
`;

const CalendarioWrapper = styled.div`
  position: relative;
`;

const AddButton = styled.button`
  position: absolute;
  right: 0;
  top: -2.5rem;
  background-color: #4b007d;
  color: white;
  font-size: 1.6rem;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-bottom: 10rem;
  &:hover { background-color: #6a1b9a; }
`;

const Calendario = styled.div`
  .fc { font-family: "Poppins", sans-serif; }
  .fc-toolbar-title { font-size: 1.3rem; font-weight: 600; color: #32004b; }
  .fc-button { background-color: #4b007d !important; border: none !important; border-radius: 6px !important; }

  .fc-daygrid-event, .fc-timegrid-event { border: none; font-size: 0.9rem; }

  .evento__conteudo { display: flex; flex-direction: column; gap: 2px; padding: 4px 6px; }
  .evento__linha1 { font-size: 0.8rem; opacity: 0.9; }
  .evento__linha2 { display: flex; align-items: center; gap: 6px; line-height: 1.2; }

  .badge { font-size: 0.7rem; padding: 2px 6px; border-radius: 999px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); }

  .evento--grupo { background-color: #1976d2 !important; color: #fff !important; }
  .evento--particular { background-color: #2e7d32 !important; color: #fff !important; }

  .badge--grupo { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); }
  .badge--particular { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); }
`;

const FormGroup = styled.div`
  display: flex; flex-direction: column; margin-bottom: 1rem;
  label { margin-bottom: 0.4rem; font-weight: 600; color: #4b007d; }
  select, input { padding: 0.6rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; }
`;

const ModalButtons = styled.div`
  display: flex; justify-content: space-between; margin-top: 1.5rem;
  button {
    background-color: #4b007d; color: white; padding: 0.6rem 1.2rem;
    border: none; border-radius: 8px; cursor: pointer;
    &:hover { background-color: #6a1b9a; }
  }
`;

const LogoutButton = styled.button`
  display: flex; align-items: center; gap: 0.5rem;
  background: none; border: none; color: #39004d; font-weight: bold; font-size: 1.2rem;
  cursor: pointer; margin-bottom: 2rem; transition: color 0.2s ease;
  &:hover { color: #520066; }
`;
