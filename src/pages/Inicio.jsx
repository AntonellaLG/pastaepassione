import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../breakpoints';

function Inicio() {
  return (
    <HeroSection>
      <HeroImage>
        <img src="../img/hero.jpg" alt="Plato de pasta" />
      </HeroImage>

      <HeroText>
        <h1>
          Bienvenidos a <span className="nombre-local">Pasta e Passione</span>
        </h1>

        <Subtitulo>
          Productos naturales de excelencia, elaborados con materia prima de primera calidad.
        </Subtitulo>

        <p>
          La esencia del trabajo artesanal, con entusiasmo, dedicación y amor por cada plato que preparamos,
          compartiendo la pasión por la pasta artesanal en cada bocado.
        </p>

        <Link to="/productos">
          <BotonInicio>Descubrí nuestras pastas</BotonInicio>
        </Link>
      </HeroText>
    </HeroSection>
  );
}

export default Inicio;



const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  max-width: 90%;
  min-height: 80vh;
  gap: 2rem;
  margin: 0 auto;

  @media (max-width: ${breakpoints.laptop}) {
    padding: 2rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const HeroText = styled.div`
  flex: 1;
  max-width: 50%;
  color: #333;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 1rem;

    .nombre-local {
      color: #d2691e;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  @media (max-width: ${breakpoints.laptop}) {
    max-width: 60%;

    h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;

    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

const Subtitulo = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: normal;
  line-height: 1.4em;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.15rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.05rem;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 80%;
    height: auto;
    border-radius: 30px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    margin-top: -30px;
  }

  @media (max-width: ${breakpoints.laptop}) {
    img {
      max-width: 90%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 1rem;

    img {
      max-width: 95%;
      border-radius: 20px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    img {
      max-width: 100%;
      margin-top: 0rem;
      border-radius: 18px;
    }
  }
`;

const BotonInicio = styled.button`
  background-color: transparent;
  color: #704214;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 100px;
  border: 1.5px solid #d6bfa7;
  padding: 10px 25px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f5ede3;
    color: #a0522d;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 0.95rem;
    padding: 9px 22px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
    padding: 8px 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: 0.85rem;
    padding: 8px 18px;
  }
`;
