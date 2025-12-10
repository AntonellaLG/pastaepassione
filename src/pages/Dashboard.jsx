import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../breakpoints';


export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem('authToken');

  const manejarAgregarProducto = () => {
    navigate('/formulario-producto');
  };

  return (
    <PageContainer>
      <Titulo>Dashboard Administrativo</Titulo>

      <Panel>
        <p>
          <strong>Sesión iniciada como: </strong> {usuario.nombre}
        </p>

        {/* TOKEN */}
        <TokenBox>
          <strong>Token de autenticación:</strong>
          <br />
          <code>{tokenActual}</code>
        </TokenBox>

        {/* ACCIONES */}
        <AccionesContainer>
          <h3>Acciones:</h3>

          <AccionesBotones>
            <BotonVerde onClick={manejarAgregarProducto}>
              Agregar Nuevo Producto
            </BotonVerde>

            <LinkAzul to="/productos">
              Editar / Eliminar Productos
            </LinkAzul>
          </AccionesBotones>
        </AccionesContainer>

        <hr />

        {/* CERRAR SESIÓN */}
        <BotonRojo onClick={cerrarSesion}>
          Cerrar sesión
        </BotonRojo>
      </Panel>
    </PageContainer>
  );
}



const Titulo = styled.h1`
  text-align: center;
`

const PageContainer = styled.div`
  padding: 30px 20px;
  min-height: 60vh;
  width: 90%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px 15px;
    width: 95%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px 10px;
  }
`;

const Panel = styled.div`
  background: #f5f5f5;
  padding: 30px;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.laptop}) {
    padding: 25px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px;
  }
`;

const TokenBox = styled.div`
  background: #e9ecef;
  padding: 12px;
  border-radius: 6px;
  margin: 15px 0;
  font-size: 15px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
    padding: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const AccionesContainer = styled.div`
  margin: 25px 0;

  h3 {
    margin-bottom: 10px;
    font-size: 1.3rem;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.2rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.1rem;
    }
  }
`;

const botonBase = `
  padding: 12px 20px;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s ease;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
    padding: 10px;
  }
`;


const BotonVerde = styled.button`
  ${botonBase};
  background: #28a745;
`;

const BotonRojo = styled.button`
  ${botonBase};
  background: #dc3545;
  margin-top: 15px;
`;

const LinkAzul = styled(Link)`
  ${botonBase};
  background: #17a2b8;
  text-decoration: none;
  display: inline-block;
`;

const AccionesBotones = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    text-align: stretch;
  }
`;
