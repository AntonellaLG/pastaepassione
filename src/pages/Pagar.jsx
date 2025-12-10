import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { BiArchive } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import styled from "styled-components";
import Swal from "sweetalert2";
import { breakpoints } from '../breakpoints';


export default function Pagar() {
  const { carrito, total, agregarCantidad, quitarCantidad, quitarDelCarrito, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const comprar = async () => {
    await Swal.fire({
      title: "¡Compra realizada!",
      text: "Tu compra se procesó con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#2e7d32",
    });

    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <Wrapper>
      {/* Carrito */}
        <Titulo><IconoCompras/> Carrito de Compras</Titulo>

        {carrito.length > 0 ? (
          <>
            <ProductosCarrito>
              {carrito.map((producto) => (
                <ProductoCard key={producto.id}>
                  <Imagen src={producto.avatar} alt={producto.nombre} />

                  <div>
                    <InfoGrid>
                      {/* Nombre */}
                      <div>
                        <h5 className="card-title text-danger">{producto.nombre}</h5>
                        <p><strong>Precio unitario:</strong></p>
                        <p className="fw-bold">${producto.precio}</p>
                      </div>

                      {/* Cantidad */}
                      <div>
                        <p><strong>Cantidad:</strong></p>

                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            onClick={() => quitarCantidad(producto.id)}
                            className="btn btn-outline-secondary btn-sm"
                            style={{ width: "40px" }}
                          >
                            -
                          </button>

                          <span className="badge bg-primary fs-6 px-3 py-2">
                            {producto.cantidad || 1}
                          </span>

                          <button
                            onClick={() => agregarCantidad(producto.id)}
                            className="btn btn-outline-secondary btn-sm"
                            style={{ width: "40px" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div>
                        <p><strong>Subtotal:</strong></p>
                        <h6 className="text-success fw-bold">
                          ${Number(producto.cantidad * producto.precio).toFixed(0)}
                        </h6>
                      </div>

                      {/* Delete */}
                      <BotonesCarrito onClick={() => quitarDelCarrito(producto.id)}>
                        <MdDelete />
                      </BotonesCarrito>

                    </InfoGrid>

                  </div>
                </ProductoCard>

              ))}
            </ProductosCarrito>
            
            <hr className="my-4" />

            {/* Total */}
            <Total>Total a pagar: <span className = "text-success fw-bold"> ${Number(total).toFixed(0)} </span></Total>

            <BotonesPagar>
              <BotonPagar className="cancelar" onClick={vaciarCarrito}>Vaciar carrito</BotonPagar>

              <BotonPagar onClick={() => navigate("/productos")}>
                Seguir comprando
              </BotonPagar>

              <BotonPagar className="confirmar" onClick={comprar}>
                Confirmar y Pagar
              </BotonPagar>
            </BotonesPagar>
            </>
        ) : (
        <>
          <CarritoVacio>
            <IconoArchivo />
            <p>No hay productos en el carrito</p>

            <BotonSeguirComprando onClick={() => navigate("/productos")}>
              Ir a productos
            </BotonSeguirComprando>
          </CarritoVacio>
        </>
        )}
    </Wrapper>
  );
}



const Wrapper = styled.div`
  padding: 1rem;
  margin: 0 auto 40px auto;
  max-width: 1200px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.5rem;
  }
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #333;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const IconoCompras = styled(GiShoppingBag)`
  color: #d2691e;
  height: 30px;
  margin-top: -10px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: -7px;
  }
`

const ProductosCarrito = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin: 1rem auto;
  padding: 20px;
`;

const ProductoCard = styled.div`  
  padding: 20px;
  border-radius: 10px;
  background-color: #efefefff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const Imagen = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 50px;
  align-items: center;
  text-align: center;
  gap: 10px;
  margin-top: 15px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const CarritoVacio = styled.div`
  display: grid;
  place-items: center;
  min-height: 45vh;
  text-align: center;
  padding: 1rem;
`;

const IconoArchivo = styled(BiArchive)`
  width: 100px;
  height: 100px;
  color: #cbc2b9ff;  
  margin: 60px 0 10px 0;

  @media (max-width: ${breakpoints.tablet}) {
    width: 85px;
    height: 85px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: ${breakpoints.laptop}) {
    width: 95px;
    height: 95px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 110px;
    height: 110px;
  }
`;

const Total = styled.h3`
  text-align: center;
  color: #333;
  margin-top: 1rem;
  padding: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const BotonesCarrito = styled.button`
  background-color: none;
  color: #dc3545;
  font-size: 1.7rem;
  padding: 8px 12px;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:  all 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

const BotonesPagar = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const BotonPagar = styled.button`
  background-color: transparent;
  color: #0d6efd;
  font-size: 1rem;
  font-weight: 400;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #0d6efd;
  padding: 0 1.5rem 0 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background-color: #0d6efd;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  /* variantes */
  &.confirmar {
    color: #2e7d32;
    border-color: #2e7d32;

    &:hover {
      color: white;
      background-color: #2e7d32;
    }
  }

  &.cancelar {
    color: #dc3545;
    border-color: #dc3545;

    &:hover {
      color: white;
      background-color: #dc3545;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const BotonSeguirComprando = styled.button`
  background: transparent;
  color: #704214;
  font-weight: 500;
  font-size: 1rem;
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
    font-size: 0.9rem;
    padding: 9px 22px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: 0.8rem;
    padding: 7px 20px;
  }
`;
