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
  background-color: #2c2c2c;
  color: #ffffff;
  text-align: center;
  padding: 35px 20px;
  font-family: 'Poppins', sans-serif;
  border-top: 1px solid #444444;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 28px 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 25px 12px;
  }
`;

const FooterText = styled.p`
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.95rem;
  }
`;

const FooterSubtext = styled.p`
  font-size: 0.9rem;
  color: #cfcfcf;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.82rem;
  }
`;

const Divider = styled.hr`
  margin: 18px auto;
  width: 60%;
  border: none;
  border-top: 1px solid #444444;

  @media (max-width: ${breakpoints.tablet}) {
    width: 75%;
  }
`;

const DeveloperText = styled.p`
  font-size: 0.9rem;
  margin-top: 12px;
  
  strong {
    font-weight: 600;
    color: #e4c59e;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.82rem;
  }
`;
