import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { breakpoints } from '../breakpoints';


export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: '', email: '' });

  const manejarEnvio = (e) => {                  
    e.preventDefault();

    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");
    }
    else if (formulario.nombre && formulario.email && formulario.nombre !== "admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre, formulario.email);

      if (ubicacion.state?.carrito) {
        navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate('/productos');
      }
    } else {
      toast.error('Credenciales de administrador incorrectas. Usa: admin / 1234@admin');
    }
  };

  return (
    <ContainerSesion>
      <FormSesion onSubmit={manejarEnvio}>
        <Titulo>
          <span className='nombre-local'>Inicia sesión</span> para continuar
        </Titulo>

        <Input
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
          required
        />

        <Input
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) => setFormulario({...formulario, email: e.target.value})}
          required
        />

        <BotonSesion type="submit">
          Iniciar Sesión
        </BotonSesion>

        <BotonSesion type="button" onClick={() => navigate('/productos')}>
          Cancelar
        </BotonSesion>

        <p style={{ marginTop: "20px", fontSize: "12px", color: "#666", textAlign: "center" }}>
          <strong>Credenciales de prueba para Dashboard:</strong><br />
          Nombre: admin<br />
          Email: 1234@admin
        </p>
      </FormSesion>
    </ContainerSesion>
  );
}



const ContainerSesion = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://www.pastasramos.com.ar/themes/vox/assets/images/slider/img4.jpg');
  margin-top: -60px;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: -40px;
    padding: 10px;
    background-size: cover;
  }
`;

const FormSesion = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf8f3;
  border: 1px solid #e5d1b8;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  max-width: 500px;
  width: 100%;

  @media (max-width: ${breakpoints.laptop}) {
    max-width: 450px;
    padding: 35px 28px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 400px;
    padding: 30px 25px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 350px;
    padding: 25px 20px;
  }
`;

const Titulo = styled.h1`
  background-color: #fffaf5;
  color: #333;
  font-size: 1.8rem;
  text-align: center;

  span {
    color: #d2691e;
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 1.7rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #d2b48c;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #a07d60;
    box-shadow: 0 0 4px rgba(160, 125, 96, 0.3);
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 14px;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
    font-size: 14px;
  }
`;

const BotonSesion = styled.button`
  background-color: #f5ede3;
  color: #a07d60;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 100px;
  border: 2px solid #a07d60;
  padding: 10px 25px;
  transition: 0.3s;
  cursor: pointer;
  margin: 8px 5px;
  width: 170px;

  &:hover {
    color: #704214;
    border-color: #704214;
    transform: scale(1.03);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 15px;
    padding: 10px 22px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
    padding: 9px 20px;
    width: 150px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: 14px;
    padding: 8px 18px;
  }
`;
