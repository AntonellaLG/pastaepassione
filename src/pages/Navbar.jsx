import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { FaShoppingCart } from "react-icons/fa";
import { breakpoints } from '../breakpoints';

function Navbar() {
  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const cerrarMenu = () => {
    const menu = document.getElementById("navbarContent");
    if (menu && menu.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(menu, { toggle: false });
      bsCollapse.hide();
    }
  };

const manejarCerrarSesion = () => {
  cerrarSesion();
  vaciarCarrito();

  cerrarMenu();

  navigate("/productos");
};


  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Logo to="/" className="navbar-brand">Pasta e Passione</Logo>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <CollapseMenu className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink to="/" className="nav-link" onClick={cerrarMenu}>Inicio</NavLink ></li>
              <li className="nav-item"><NavLink to="/nosotros" className="nav-link" onClick={cerrarMenu}>Nosotros</NavLink></li>
              <li className="nav-item"><NavLink to="/productos" className="nav-link" onClick={cerrarMenu}>Productos</NavLink></li>
              <li className="nav-item"><NavLink to="/contacto" className="nav-link" onClick={cerrarMenu}>Contacto</NavLink></li>

              {/* ENLACES PARA ADMIN - Solo visibles para admin */}
              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLink to="/formulario-producto" className="nav-link" onClick={cerrarMenu}>Agregar Producto</NavLink>
                </li>
              )}
            </ul>

            
            {/* Si está autenticado */}
            <SeccionUsuario className="d-flex align-items-center gap-3">
              <ContenedorCarrito> 
                <IconoCarrito to="/pagar" className="nav-link d-flex align-items-center" onClick={cerrarMenu}>
                  <span className="me-1">Carrito</span>
                  <FaShoppingCart /> 
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>
                      {totalItemsCarrito}
                    </ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>

                  {usuario.nombre === "admin" && (
                    <NavLinkAdmin to="/dashboard" className="nav-link" onClick={cerrarMenu}>Dashboard</NavLinkAdmin>
                  )}

                  <BotonCerrarSesion type="button" onClick={manejarCerrarSesion} className="btn btn-outline-light btn-sm">
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>

              ) : (
                <NavLink to="/iniciar-sesion" className="nav-link" onClick={cerrarMenu}>Iniciar Sesión</NavLink>
              )}
            </SeccionUsuario>
          </CollapseMenu>
        </div>
      </NavbarContainer>
      <NavbarSpacer />
    </>
  )
}

export default Navbar;



const NavbarContainer = styled.nav`
  background-color: rgb(28, 28, 28) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;

  @media (max-width: ${breakpoints.laptop}) {
    padding: 0.7rem 1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.5rem 0.8rem;
  }
`;

const CollapseMenu = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    position: absolute;
    top: 50px;
    right: 0;
    width: 70%;       /* ANCHO DEL PANEL */
    max-width: 260px; /* límite opcional */
    background: rgb(28, 28, 28);
    padding: 15px;
    border-radius: 8px 0 0 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);

    /* importante: bootstrap fuerza width 100% */
    &.collapse.show {
      display: block !important;
    }

    /* ocultar cuando está cerrado */
    &.collapse:not(.show) {
      display: none !important;
    }

    ul {
      flex-direction: column !important;
      align-items: flex-center;
      gap: 0.4rem !important;
    }
  }
`;

const Logo = styled(Link)`
  color: #d2691e !important;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
 
  &:hover {
    color: #d2691e !important;
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 1.3rem;
  }
    
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;


const NavLink = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
 
  &:hover {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.4rem 0.6rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.3rem 0.4rem;
    font-size: 0.9rem;
  }
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

const IconoCarrito = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: inherit;
  gap: 5px;
 
  &:hover {
    color: orange !important;
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;

  @media (max-width: ${breakpoints.mobile}) {
    width: 16px;
    height: 16px;
    font-size: 0.65rem;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;

const Bienvenida = styled.span`
  color: white;
  font-size: inherit;
  margin: 0;
  white-space: nowrap;

  @media (max-width: ${breakpoints.laptop}) {
    margin-bottom: 0.5rem;
  }
`;

// NavLink especial para admin
const NavLinkAdmin = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: inherit;
 
  &:hover {
    color: orange !important;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const BotonCerrarSesion = styled.button`
  background: white;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  font-size: inherit !important;

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const NavbarSpacer = styled.div`
  height: 60px;

  @media (max-width: ${breakpoints.laptop}) {
    height: 50px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    height: 45px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: 40px;
  }
`;