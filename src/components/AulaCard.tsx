import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding-bottom: 1rem;
`;

const Badge = styled.div`
  background: crimson;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 1.2rem;

  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0 1.2rem 0;
    font-weight: bold;
    color: #300244;
  }

  button {
    background-color: #39004d;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #520066;
    }
  }
`;

const SeeMore = styled.a`
  text-align: center;
  display: block;
  margin-top: 1rem;
  color: #39004d;
  text-decoration: underline;
  font-size: 0.9rem;
  cursor: pointer;
`;

type Props = {
  title: string;
  img: string;
};

const AulaCard = ({ title, img }: Props) => {
  return (
    <Card>
      <ImageWrapper>
        <Badge>Best Seller</Badge>
        <img src={img} alt={title} />
      </ImageWrapper>
      <Info>
        <h3>{title}</h3>
        <button>Comprar</button>
      </Info>
      <SeeMore>Veja Mais</SeeMore>
    </Card>
  );
};

export default AulaCard;

// import React from "react";
// import styled from "styled-components";

// const Card = styled.div`
//   background: white;
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   padding: 1.5rem 1rem;
//   width: 220px;
// `;

// const Info = styled.div`
//   h3 {
//     font-size: 1.2rem;
//     margin-bottom: 0.5rem;
//     font-weight: bold;
//     color: #300244;
//   }
//   p {
//     margin: 0.3rem 0;
//     font-size: 0.9rem;
//     color: #555;
//   }
// `;

// const MeetButton = styled.a`
//   display: inline-block;
//   margin-top: 1rem;
//   background-color: #39004d;
//   color: white;
//   border: none;
//   padding: 0.75rem 1.5rem;
//   border-radius: 6px;
//   font-weight: 600;
//   font-size: 1rem;
//   cursor: pointer;
//   text-decoration: none;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #520066;
//   }
// `;

// type Props = {
//   title: string;
//   duracao: string;
//   dataHora: string;
//   meetLink?: string;
// };

// const AulaCard = ({ title, duracao, dataHora, meetLink }: Props) => {
//   // Se não houver link do backend, cria um novo link do Meet
//   const linkFinal = meetLink && meetLink.trim() !== "" 
//     ? meetLink 
//     : "https://meet.google.com/new";

//   return (
//     <Card>
//       <Info>
//         <h3>{title}</h3>
//         <p>Duração: {duracao}</p>
//         <p>{dataHora}</p>
//       </Info>
//       <MeetButton href={linkFinal} target="_blank" rel="noopener noreferrer">
//         Entrar na Aula
//       </MeetButton>
//     </Card>
//   );
// };

// export default AulaCard;
