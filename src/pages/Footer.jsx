import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../breakpoints';

function Footer() {
  return (
    <FooterContainer>
      <FooterText>
        © 2025 Pasta e Passione — Hecho con amor y tradición italiana
      </FooterText>

      <FooterSubtext>
        Av. Italia 1234, Buenos Aires | Tel: (011) 4567-8901
      </FooterSubtext>

      <Divider />

      <DeveloperText>
        Desarrollado por <strong>Fiamma Lugo Gutiérrez</strong>
      </DeveloperText>
    </FooterContainer>
  );
}

export default Footer;



const FooterContainer = styled.footer`
  background-color: #faf6f2;
  color: #704214;
  text-align: center;
  padding: 30px 20px;
  font-family: 'Poppins', sans-serif;
  border-top: 1px solid #e0d6cc;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 25px 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 22px 12px;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 6px;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 0.95rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const FooterSubtext = styled.p`
  font-size: 0.85rem;
  color: #a07d60;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const Divider = styled.hr`
  margin: 15px auto;
  width: 60%;
  border: none;
  border-top: 1px solid #e0d6cc;

  @media (max-width: ${breakpoints.tablet}) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80%;
  }
`;

const DeveloperText = styled.p`
  font-size: 0.85rem;
  margin-top: 10px;
  color: #704214;

  strong {
    font-weight: 600;
  }

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;
