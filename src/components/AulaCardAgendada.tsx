// import React from "react";
// import styled from "styled-components";

// const Card = styled.div`
//   background: white;
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   padding: 1.2rem;
//   width: 220px;
// `;

// const Info = styled.div`
//   h3 {
//     font-size: 1.1rem;
//     margin: 0.5rem 0;
//     font-weight: bold;
//     color: #300244;
//   }

//   p {
//     font-size: 0.9rem;
//     color: #333;
//     margin-bottom: 1rem;
//   }

//   button {
//     background-color: #39004d;
//     color: white;
//     border: none;
//     padding: 0.6rem 1.5rem;
//     border-radius: 6px;
//     font-weight: 600;
//     font-size: 0.9rem;
//     cursor: pointer;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #520066;
//     }

//     &:disabled {
//       background-color: #b9a0c2;
//       cursor: not-allowed;
//     }
//   }
// `;

// type Props = {
//   title: string;
//   duracao: string;
//   dataHora: string;
//   meetLink?: string; // <<<<< link do Google Meet (opcional)
// };

// const AulaCardAgendada = ({ title, duracao, dataHora, meetLink }: Props) => {
//   const handleOpenMeet = () => {
//     if (!meetLink) return;
//     window.open(meetLink, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <Card>
//       <Info>
//         <h3>{title}</h3>
//         <p>Duração: {duracao}</p>
//         <p>{dataHora}</p>
//         <button onClick={handleOpenMeet} disabled={!meetLink}>
//           {meetLink ? "Entrar no Meet" : "Link indisponível"}
//         </button>
//       </Info>
//     </Card>
//   );
// };

// export default AulaCardAgendada;
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 1.2rem;
  width: 220px;
`;

const Info = styled.div`
  h3 {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    font-weight: bold;
    color: #300244;
  }

  p {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 1rem;
  }

  button {
    background-color: #39004d;
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #520066;
    }
  }
`;

type Props = {
  title: string;
  duracao: string;
  dataHora: string;
  meetLink?: string;
};

const AulaCardAgendada = ({ title, duracao, dataHora, meetLink }: Props) => {
  const handleOpenMeet = () => {
    const linkFinal =
      meetLink && meetLink.trim() !== "" ? meetLink : "https://meet.google.com/new";
    window.open(linkFinal, "_blank", "noopener,noreferrer");
  };

  return (
    <Card>
      <Info>
        <h3>{title}</h3>
        <p>Duração: {duracao}</p>
        <p>{dataHora}</p>
        <button onClick={handleOpenMeet}>
          Entrar no Meet
        </button>
      </Info>
    </Card>
  );
};

export default AulaCardAgendada;
