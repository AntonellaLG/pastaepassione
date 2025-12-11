import { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { breakpoints } from "../breakpoints";


function Contacto() {

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (enviado) {
      Swal.fire({
        icon: "success",
        title: "¡Gracias!",
        text: "Tu mensaje fue enviado con éxito.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2e7d32",
      });
    }
  }, [enviado]);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formulario);
    setEnviado(true);

    setFormulario({ nombre: '', correo: '', mensaje: '' });

    setTimeout(() => setEnviado(false), 7000);
  };

  return (
    <>
      <Titulo>Contacto</Titulo>

      <ContactoContainer>
        
        {/* COLUMNA IZQUIERDA */}
        <Tarjeta id="contacto-tarjeta">
          <h3>Enviá tu mensaje</h3>

          <form onSubmit={manejarEnvio}>
            <div>
              <Label>Nombre:</Label>
              <Input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Escribe tu nombre"
                required
              />
            </div>

            <div>
              <Label>Correo:</Label>
              <Input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={manejarCambio}
                placeholder="ejemplo@email.com"
                required
              />
            </div>

            <div>
              <Label>Mensaje:</Label>
              <Textarea
                value={formulario.mensaje}
                name="mensaje"
                onChange={manejarCambio}
                placeholder="Escribe tu mensaje"
                required
              />
            </div>

            <Boton type="submit">Enviar</Boton>
          </form>
        </Tarjeta>

        {/* COLUMNA DERECHA */}
        <Info id="contacto-info">

          <WrapContacto>
            <Icono src="https://www.pastasramos.com.ar/themes/vox/assets/images/telefono.png" />
            <div>
              <ContactoH3>Llamanos</ContactoH3>
                <a href="tel:01142083818">(011) 4567-8901</a>
            </div>
          </WrapContacto>

          <WrapContacto>
            <Icono src="https://www.pastasramos.com.ar/themes/vox/assets/images/mail.png" />
            <div>
              <ContactoH3>Escribinos</ContactoH3>
              <a href="mailto:info@pastasramos.com.ar">info@pastaepassione.com.ar</a>
            </div>
          </WrapContacto>

          <WrapContacto>
            <ContactoH3>Seguinos</ContactoH3>
            <RedesSociales>
              <a href="https://www.facebook.com/Pastas-e-Passione" target="_blank">
                <IconoRed src="https://www.pastasramos.com.ar/themes/vox/assets/images/ico-facebook.png" />
              </a>
              <a href="https://www.instagram.com/Pasta-e-Passione/" target="_blank">
                <IconoRed src="https://www.pastasramos.com.ar/themes/vox/assets/images/ico-instagram.png" className="icono-instagram" />
              </a>
            </RedesSociales>
          </WrapContacto>

        </Info>
      </ContactoContainer>
    </>
  );
}

export default Contacto;



const Titulo = styled.h1`
  text-align: center;
  color: #52310f;
  margin-bottom: 1rem;
  font-size: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.7rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const ContactoContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  width: 90%;
  margin: 0 auto 40px auto;

  @media (max-width: ${breakpoints.laptop}) {
    width: 92%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    width: 95%;
  }
`;

const Tarjeta = styled.div`
  margin-left: 10%;

  @media (max-width: ${breakpoints.laptop}) {
    margin-left: 5%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 1.5rem;
  display: block;
  color: #555;
  font-size: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid #e0d6cc;
  font-size: 1rem;
  background-color: transparent;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #a07d60;
    outline: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  width: 80%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid #e0d6cc;
  font-size: 1rem;
  background-color: transparent;
  color: #333;
  resize: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #a07d60;
    outline: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const Boton = styled.button`
  background-color: #f5ede3;
  color: #a07d60;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 400;
  margin-top: 20px;
  border-radius: 100px;
  border: 2px solid #a07d60;
  padding: 10px 25px;
  transition: 0.3s;

  &:hover {
    color: #704214;
    border-color: #704214;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 8px 15px;
    font-size: 14px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  padding: 1rem 0;
  height: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 1.5rem;
    text-align: center;
  }
`;

const WrapContacto = styled.div`
  margin-top: 20px;

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }
`;

const Icono = styled.img`
  max-width: 80px;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 60px;
  }
`;

const IconoRed = styled.img`
  max-width: 40px;

  &.icono-instagram {
    margin-left: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 32px;
  }
`;

const RedesSociales = styled.div`
  margin-top: 20px;
`;

const ContactoH3 = styled.h3`
  color: #a07d60;
  margin: 0 0 4px 0;
  font-weight: 600;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;