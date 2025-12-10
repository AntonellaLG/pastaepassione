import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../breakpoints';


function Nosotros() {
  return (
    <Container>
      <Texto>
        <h1>
          Acerca de <span className="nombre-local">nosotros</span>
        </h1>

        <Intro>
          Productos naturales de excelencia, elaborados con materia prima de primera calidad.
        </Intro>

        <p>
          Nuestra historia comienza hace más de dos décadas en un pequeño taller familiar del sur
          de Buenos Aires. Inspirados por las tradiciones italianas de nuestros abuelos, decidimos
          mantener viva la esencia del trabajo artesanal: amasar, cortar y rellenar cada pasta con
          entusiasmo, dedicación y amor por la buena comida.
        </p>

        <p>
          Hoy seguimos creciendo, pero sin perder el alma de nuestros inicios. En cada plato que
          preparamos buscamos compartir esa pasión que nos une a lo simple, lo auténtico y lo hecho
          con las manos. Porque en <strong><span className="nombre-local">Pasta e Passione</span></strong>, cada bocado cuenta una historia.
        </p>
      </Texto>

      <Imagen>
        <img
          src="https://www.pastasramos.com.ar/themes/vox/assets/images/bloque-excelencia.jpg"
          alt="Elaboración artesanal de pasta"
        />
      </Imagen>
    </Container>
  );
}

export default Nosotros;



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 3rem 6rem;
  background-color: #fffaf5;
  color: #333;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 3rem 4rem;
    gap: 2.5rem;
  }

  @media (max-width: ${breakpoints.laptop}) {
    padding: 3rem 3rem;
    gap: 2rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column-reverse;
    text-align: center;
    padding: 2.5rem 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 2rem 1.2rem;
    gap: 1.5rem;
  }
`;

const Texto = styled.div`
  flex: 1;
  max-width: 55%;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 1rem;

    .nombre-local {
      color: #d2691e;
    }
  }

  p {
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  span {
    color: #d2691e;
  }

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 60%;
  }

  @media (max-width: ${breakpoints.laptop}) {
    max-width: 65%;

    h1 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    h1 {
      font-size: 1.7rem;
      line-height: 1.2;
    }
      
    p {
      font-size: 0.95rem;
    }
  }
`;

const Intro = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 1.15rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.05rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Imagen = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 85%;
    max-width: 480px;
    border-radius: 24px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${breakpoints.desktop}) {
    img {
      width: 90%;
    }
  }

  @media (max-width: ${breakpoints.laptop}) {
    img {
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    img {
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    img {
      border-radius: 18px;
      width: 100%;
    }
  }
`;
