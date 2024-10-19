import React from 'react';
import styled from 'styled-components';
import { BUILD_NUMBER, IS_DEBUG, VERSION } from '../config/constants';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center; /* Alinha centralizado */
    align-items: center;
    padding: 10px 20px;
    background-color: #282c34;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box; /* Para garantir que o padding não aumente a largura */
    flex-wrap: wrap; /* Permite que os itens se movam para a linha seguinte, se necessário */
`;

const VersionInfo = styled.span`
    font-size: 14px;
    text-align: center; /* Centraliza o texto */
    margin: 0; /* Remove margens, se houver */
`;

const Footer = () => {
    return (
        <FooterContainer>
            <VersionInfo>{`Version: ${VERSION} | BUILD: ${BUILD_NUMBER}${IS_DEBUG ? ' | Debug' : ''}`}</VersionInfo>
        </FooterContainer>
    );
};

export default Footer;