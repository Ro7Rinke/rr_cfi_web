// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { BUILD_NUMBER, IS_DEBUG, VERSION } from '../config/constants';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #282c34;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const VersionInfo = styled.span`
    font-size: 14px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <VersionInfo>{`Version: ${VERSION} | BUILD: ${BUILD_NUMBER}${IS_DEBUG ? ' | Debug' : ''}`}</VersionInfo>
        </FooterContainer>
    );
};

export default Footer;