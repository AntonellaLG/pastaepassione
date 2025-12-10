import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { breakpoints } from '../breakpoints';


function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;

  const [cargando, setCargando] = useState(false);
  const { eliminarProducto } = useProducts();



  const manejarEliminar = async () => {
    const resultado = await Swal.fire({
      title: "¿Eliminar producto?",
      text: `¿Querés borrar "${producto.nombre}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    });

    if (!resultado.isConfirmed) return;

    try {
      await eliminarProducto(producto.id);
      toast.success("Producto eliminado correctamente");
      setTimeout(() => navigate("/productos"), 400);
    } catch {
      toast.error("Hubo un problema al eliminar");
    }
  };

  return (
    <Contenedor>
      <Titulo>Eliminar Producto</Titulo>

      <CajaConfirmacion>
        <Subtitulo>¿Estás seguro de que deseas eliminar este producto?</Subtitulo>

        <InfoProducto>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>

          {producto.avatar && (
            <ImagenProducto
              src={producto.avatar}
              alt="Producto a eliminar"
            />
          )}
        </InfoProducto>

      </CajaConfirmacion>

      <Botones>
        <BotonRojo onClick={manejarEliminar} disabled={cargando}>
          {cargando ? 'Eliminando...' : 'Eliminar'}
        </BotonRojo>

        <BotonGris onClick={() => navigate('/productos')} disabled={cargando}>
          Cancelar
        </BotonGris>
      </Botones>
    </Contenedor>
  );
}

export default EliminarProducto;



const Contenedor = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  text-align: center;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 90%;
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 95%;
    padding: 15px;
    margin: 25px auto;
  }
`;

const Titulo = styled.h2`
  color: #dc3545;
  margin-bottom: 20px;
  font-size: 1.8rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const CajaConfirmacion = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  background-color: #f8f9fa;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
  }
`;

const Subtitulo = styled.h3`
  color: #dc3545;
  font-size: 1.3rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const InfoProducto = styled.div`
  text-align: center;
  margin: 20px 0;

  p {
    font-size: 1rem;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 0.95rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }
`;

const ImagenProducto = styled.img`
  max-width: 220px;
  margin-top: 12px;
  border-radius: 6px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 180px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 150px;
  }
`;

const Botones = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

const BotonRojo = styled.button`
  padding: 12px 24px;
  background-color: ${props => (props.disabled ? '#ccc' : '#dc3545')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  transition: 0.2s;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 10px 18px;
  }
`;

const BotonGris = styled.button`
  padding: 12px 24px;
  background-color: ${props => (props.disabled ? '#ccc' : '#6c757d')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  transition: 0.2s;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 10px 18px;
  }
`;
