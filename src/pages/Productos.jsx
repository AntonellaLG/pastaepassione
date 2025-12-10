import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { breakpoints } from '../breakpoints';


export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    document.title = "Pasta e Passione | Tienda de Pastas Frescas - Productos";
   
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', 'Pasta e Passione ofrece pastas frescas artesanales, salsas caseras y productos gourmet elaborados con tradición y calidad.');
    updateMetaTag('keywords', 'pastas frescas, pasta artesanal, salsas caseras, comida italiana, fideos, ravioles, ñoquis, productos gourmet, Pasta e Passione');
    updateMetaTag('author', '@fiamma.lugo');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Pasta e Passione | Tienda de Pastas Frescas Artesanales', 'property');
    updateMetaTag('og:description', 'Descubrí nuestras pastas frescas artesanales, elaboradas con ingredientes de calidad y pasión italiana.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);


  const productosPorPagina = 4;


  const manejarEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate("/eliminar-producto", { state: { producto } });
  };

  const manejarEditar = (producto) => {
    // Navegar al formulario de edición
    navigate("/formulario-producto", { state: { producto } });
  };


  //Filtro por nombre o por descripción
  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.descripcion &&
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };


  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageWrapper>
      <TitleProductos>Nuestras pastas</TitleProductos>

        {/* Barra de búsqueda */}
      <SearchContainer>
        <p className="lead text-muted">Filtra por nombre o descripción para encontrar la pasta que buscas.</p>

        <Label>Buscar productos</Label>
        <InputSearch
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={busqueda}
          onChange={manejarBusqueda}
        />

        {busqueda && (
          <SearchInfo>
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </SearchInfo>
        )}
      </SearchContainer>

      <ListaProductos>
        {productosActuales.map((producto) => (
          <ProductoItem
            key={producto.id}
            producto={producto}
            esAdmin={esAdmin}
            onEditar={() => manejarEditar(producto)}
            onEliminar={() => manejarEliminar(producto)}
            onAgregarCarrito={() => agregarAlCarrito(producto)}
          />
        ))}
      </ListaProductos>

      {/* Paginador - Estilo simplificado */}
      {productosFiltrados.length > productosPorPagina && (
        <PaginationWrapper>
          {Array.from({ length: totalPaginas }, (_, index) => (
            <PageButton
              key={index + 1}
              activo={paginaActual === index + 1}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationWrapper>
      )}


      {/* Información de la página actual */}
      {productosFiltrados.length > 0 && (
        <div className="text-center text-muted mt-2">
          <small>
            Mostrando {productosActuales.length} productos
            (página {paginaActual} de {totalPaginas})
          </small>
        </div>
      )}

    </ PageWrapper>
  );
}

const ProductoItem = ({ producto, esAdmin, onEditar, onEliminar, onAgregarCarrito }) => (
  <ProductoCard>
    <NombreProducto>{producto.nombre}</NombreProducto>

    <DescripcionProducto>{producto.descripcion}</DescripcionProducto>

    <p>Precio: ${producto.precio}</p>

    <ImagenProducto src={producto.avatar} alt={producto.nombre} />

    <Link to={`/productos/${producto.id}`} state={{ producto }}>
      <BtnProducto>Más detalles</BtnProducto>
    </Link>

    <BtnProducto onClick={onAgregarCarrito}>Comprar</BtnProducto>

    {esAdmin && (
      <BtnAdminContainer>
        <hr />
        <BtnEditar onClick={onEditar}>Editar</BtnEditar>
        <BtnEliminar onClick={onEliminar}>Eliminar</BtnEliminar>
      </BtnAdminContainer>
    )}
  </ProductoCard>
);



const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 10px;
  }
`;

const TitleProductos = styled.h1`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: -1px;
  color: #52310f;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

const SearchContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #52310f;
`;

const InputSearch = styled.input`
  padding: 10px;
  border: 1.5px solid #d6bfa7;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #b08a65;
    box-shadow: 0 0 5px rgba(176, 138, 101, 0.4);
  }
`;

const SearchInfo = styled.small`
  color: #705037;
`;

const ListaProductos = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)); 
  gap: 2rem;
  margin-top: 2rem;
  list-style: none;
  padding: 0;
  width: 100%;

  @media (max-width: ${breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;


const ProductoCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 30px;
  box-shadow: 0 11px 38px -15px rgba(0, 0, 0, 0.5);
  text-align: center;
  min-height: 500px;
  height: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 420px;
    padding: 0.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-height: auto;
    padding: 1rem 0.5rem;
    border-radius: 20px;
  }
`;

const NombreProducto = styled.h2`
  color: #704214;
  font-size: 1.5em;
`;

const DescripcionProducto = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 60px;
`;

const ImagenProducto = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-top: 0.5rem;
  max-width: 260px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 220px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 180px;
  }
`;

const BtnProducto = styled.button`
  background-color: transparent;
  color: #704214;
  border: 1.5px solid #d6bfa7;
  border-radius: 50px;
  padding: 8px 20px;
  margin: 5px 0 0 0 ;
  font-size: 0.9rem;
  width: 130px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5ede3;
    color: #a0522d;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const BtnAdminContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  text-align: center;

  hr {
    width: 80%;
    border: 0.5px solid #ddd;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BtnEditar = styled.button`
  background-color: #fff8e6;
  color: #17a2b8;
  border: 1.5px solid #17a2b8;
  border-radius: 50px;
  padding: 6px 18px;
  margin: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #0b7586ff;
    border-color: #0b7586ff;
    transform: scale(1.03);
  }
`;

const BtnEliminar = styled.button`
  background-color: #ffebee;
  color: #c62828;
  border: 1.5px solid #c62828;
  border-radius: 50px;
  padding: 6px 18px;
  margin: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #8e0000;
    border-color: #8e0000;
    transform: scale(1.03);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #704214;
  background-color: ${({ activo }) => (activo ? "#704214" : "transparent")};
  color: ${({ activo }) => (activo ? "#f5ede3" : "#704214")};
  transition: 0.2s ease;

  &:hover {
    color: #f5ede3 !important;
    background-color: #704214 !important;
  }
`;