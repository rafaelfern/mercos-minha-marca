import React, { useState } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { FaWhatsapp, FaUser, FaMapMarkerAlt, FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContent = styled.div`
  display: flex;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  height: 160px;
  width: 100%;
  background-color: var(--color-background-header);
  border-bottom: 1px solid var(--color-border-bottom);

  .content-contato-header {
    display: flex;
    justify-content: space-between; 
    margin-top: 20px;
    margin-bottom: 15px;
    height: 20px;
    font: 400 12px roboto;
  }

  .search-bar-content {
    height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .links-content {
    display: flex;
    align-items: center;
  }

  .links-content > a {
    line-height: 25px;
    letter-spacing: 0.1px;
    font: 700 14px Roboto;
  }

  input::placeholder{
    line-height: 20px;
    font: 500 14px Roboto;
  }

  .logo-content {
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .cart-content-icon > span {
    font: 700 14px Roboto;
    line-height: 25px;
    letter-spacing: 0.1px;
  }
  
`;

export default function Index() {

  const [ buscaProduto, setBuscaProduto ] = useState(''); 

  return (
    <>
      <HeaderContent>
        <Container>
        <Row className="content-contato-header">
          <Col className="icon-text">
            <FaWhatsapp /> &nbsp; (47) 99999-9999
          </Col>
          <Col className="icon-text">
            <FaUser /> &nbsp; Arethusa
            &nbsp;&nbsp;&nbsp;
            <FaMapMarkerAlt/> &nbsp; Bom Retiro - Joinville, SC
          </Col>
        </Row>
        <Row className="logo-content">
          <Col>
            Sua Marca
          </Col>
        </Row>
        <Row className="search-bar-content">
          <Col className="links-content">
            <Link className="icon-text"><FaBars />&nbsp;SETORES </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link> OFERTAS </Link>
          </Col>
          <Col>
            <Input className="input-busca-prod" type="text" placeholder="O que você procura?" name="buscaProduto" value={buscaProduto} onChange={(e) => setBuscaProduto(e.target.value) } />
          </Col>
          <Col className="cart-content-icon icon-text">
            <FaShoppingCart />&nbsp; <span>R$ 62,50</span>
          </Col>
          
        </Row>
        </Container>
      </HeaderContent>
      
    </>
  )
}
