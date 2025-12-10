import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { FiSave } from "react-icons/fi";
import styled from 'styled-components';
import { toast } from 'react-toastify';

function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();

  const productoRecibido = location.state?.producto;
  const modo = productoRecibido ? "editar" : "agregar";

  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    avatar: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Cargar datos del producto si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && productoRecibido) {
      setProducto({
        id: productoRecibido.id || '',
        nombre: productoRecibido.nombre || '',
        precio: productoRecibido.precio || '',
        descripcion: productoRecibido.descripcion || '',
        avatar: productoRecibido.avatar || ''
      });
    }
  }, [modo, productoRecibido]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'descripcion' && value.length > 200) return;

    setProducto(prev => ({ ...prev, [name]: value }));

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // f(x) validarFormulario - ahora usa la validación del contexto
  const validarFormulario = () => {
    const resultado = validar(producto);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Valida antes de enviar usando el contexto
    if (!validarFormulario()) {
      toast.error("Hay errores en el formulario. Revísalos antes de continuar.");
      return;
    }

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === "agregar") {
        // Usar el contexto para agregar producto
        const nuevoProducto = await agregarProducto(productoEnviar);

        toast.success(`Producto "${nuevoProducto.nombre}" agregado correctamente`, {
          autoClose: 1500
        });

        // Limpia el formulario después del éxito
        setProducto({
          id: '',
          nombre: '',
          precio: '',
          descripcion: '',
          avatar: ''
        });

        setTimeout(() => navigate('/productos'), 700);

      } else {
        await editarProducto(productoEnviar);
        toast.success('Producto actualizado correctamente', {
          autoClose: 1500
        });
        setTimeout(() => navigate('/productos'), 700);
      }

      setErrores({});
      
    } catch (error) {
      toast.error(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    if (modo === "editar") {
      toast.warning('Edición cancelada');
      setTimeout(() => navigate('/productos'), 600);
    }
  };

  return (
    <FormContainer onSubmit={manejarEnvio}>
      <Title>{modo === "editar" ? 'Editar' : 'Agregar'} Producto</Title>

      {modo === "editar" && productoRecibido && (
        <EditInfo>
          Editando: {productoRecibido.nombre} (ID: {productoRecibido.id})
        </EditInfo>
      )}

      {/* Nombre */}
      <FieldContainer>
        <Label>Nombre: *</Label>
        <Input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={manejarCambio}
          disabled={cargando}
          error={errores.nombre}
          placeholder="Ingrese el nombre del producto"
        />
        {errores.nombre && <ErrorText>{errores.nombre}</ErrorText>}
      </FieldContainer>

      {/* Precio */}
      <FieldContainer>
        <Label>Precio: *</Label>
        <Input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ej: 40.000"
          error={errores.precio}
        />
        <InfoText>Formato argentino: punto para miles, sin decimales.</InfoText>
        {errores.precio && <ErrorText>{errores.precio}</ErrorText>}
      </FieldContainer>

      {/* Avatar */}
      <FieldContainer>
        <Label>Imagen (URL):</Label>
        <Input
          type="text"
          name="avatar"
          value={producto.avatar}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="https://ejemplo.com/avatar.jpg"
        />
      </FieldContainer>

      {/* Descripción */}
      <FieldContainer>
        <Label>Descripción: *</Label>
        <TextArea
          name="descripcion"
          value={producto.descripcion}
          onChange={manejarCambio}
          rows="4"
          disabled={cargando}
          error={errores.descripcion}
          maxLength="200"
          placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
        />
        <InfoText error={producto.descripcion.length > 200}>
          {producto.descripcion.length}/200 caracteres
        </InfoText>
        {errores.descripcion && <ErrorText>{errores.descripcion}</ErrorText>}
      </FieldContainer>

      <ButtonsRow>
        <Button
          type="submit"
          full
          disabledState={cargando}
          color="#d2691e"
        >
          {cargando
            ? modo === "editar" ? 'Actualizando...' : 'Agregando...'
            : modo === "editar" ? 'Confirmar Cambios' : (<><IconoGuardar /> Agregar Producto</>)
          }
        </Button>

        {modo === "editar" && (
          <CancelButton
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </CancelButton>
        )}
      </ButtonsRow>

      <RequiredInfo>(*) Campos obligatorios</RequiredInfo>
    </FormContainer>
  );
}

export default FormularioProducto;

/* =======================  STYLED COMPONENTS  ======================= */

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2``;

const EditInfo = styled.p`
  color: #666;
  font-style: italic;
`;

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 4px;
  resize: vertical;
`;

const ErrorText = styled.p`
  color: red;
  margin: 5px 0;
  font-size: 14px;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: ${({ error }) => (error ? 'red' : '#666')};
  margin-top: 5px;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: ${({ full }) => (full ? '100%' : 'auto')};
  padding: 12px;
  background-color: ${({ disabledState, color }) =>
    disabledState ? '#ccc' : color};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${({ disabledState }) => (disabledState ? 'not-allowed' : 'pointer')};
`;

const CancelButton = styled(Button)`
  flex: 1;
  background-color: #6c757d;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const IconoGuardar = styled(FiSave)`
  width: 17px;
  height: 17px;
  margin-right: 8px;
`

const RequiredInfo = styled.p``;
