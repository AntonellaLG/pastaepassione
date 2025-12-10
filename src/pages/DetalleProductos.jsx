import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import styled from 'styled-components';
import { breakpoints } from "../breakpoints";

const ProductoDetalle = () => {
  const { id } = useParams();
  const location = useLocation(); 
  const producto = location.state?.producto;
  const { agregarAlCarrito } = useCartContext();
 
  if (!producto) {
    return (
      <div>
        <p>No se pudo cargar el producto</p>
        <Link to="/carrito">
          <button>Volver a Productos</button>
        </Link>
      </div>
    );
  }
 
  return (
    <Container>
      <h2>Detalles del producto</h2>

      <Content>
        {/* Columna izquierda */}
        <ImageContainer>
          <img src={producto.avatar} alt={producto.nombre} />
        </ImageContainer>

        {/* Columna derecha */}
        <InfoContainer>
          <h4 className="text-danger mb-2">{producto.nombre}</h4>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <BtnAgregar onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</BtnAgregar>
        </InfoContainer>
      </Content>
      <Link to="/productos">
        <BotonEstilizado>Volver a productos</BotonEstilizado>
      </Link>
    </Container>
  );
};

export default ProductoDetalle;


const Container = styled.div`
  padding: 30px 20px;
  width: 85%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.laptop}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
    text-align: center;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
    padding: 15px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.laptop}) {
    gap: 25px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr; /* Una sola columna */
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 450px;
    border-radius: 10px;
    object-fit: cover;

    @media (max-width: ${breakpoints.laptop}) {
      max-width: 400px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      max-width: 350px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      max-width: 300px;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px 10px;
  gap: 15px;

  h4 {
    font-size: 1.5rem;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.35rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.2rem;
    }
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;

    @media (max-width: ${breakpoints.laptop}) {
      font-size: 1rem;
    }

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 0.95rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }
`;

const BtnAgregar = styled.button`
  background-color: transparent;
  color: #704214;
  border: 1.5px solid #d6bfa7;
  padding: 10px 20px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #f5ede3;
    color: #a0522d;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const BotonEstilizado = styled.button`
  background: transparent;
  color: #704214;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  border: 1.5px solid #d6bfa7;
  padding: 10px 25px;
  margin-top: 35px;
  border-radius: 100px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #f5ede3;
    color: #a0522d;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 25px;
    font-size: 14px;
    padding: 9px 22px;
  }
`;
