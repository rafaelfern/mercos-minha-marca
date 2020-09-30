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
  background-color: var(--color-background-header);
  border-bottom: 1px solid var(--color-border-bottom);
  position: fixed;
  top: 0;
  width: 100%;
  z-index:2;
  
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

  input:active,
  input:focus {
    background-color: var(--color-background);
    box-shadow: 0 0 0 0;
    font: 400 14px Roboto;
  }

  input::placeholder{
    line-height: 20px;
    font: 500 14px Roboto;
    color: var(--color-input-placeholder-header);
  }

  .logo-content {
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .cart-content-icon{
    display: flex;
    justify-content: flex-end;
  }
    
  .cart-content-icon > span {
    font: 700 14px Roboto;
    line-height: 25px;
    letter-spacing: 0.1px;
  }
  
`;

export default function Index(props) {

  const { valorTotalCompra, regrasDesconto } = props;
  const [ buscaProduto, setBuscaProduto ] = useState(''); 

  return (
    <>
      <HeaderContent>
        <Container className="container-header" fluid={true}>
        <Row className="content-contato-header">
          <Col className="icon-text">
            <FaWhatsapp /> &nbsp; (47) 99999-9999
          </Col>
          <FaUser /> &nbsp; Arethusa
          &nbsp;&nbsp;&nbsp;
          <FaMapMarkerAlt/> &nbsp; Bom Retiro - Joinville, SC
        </Row>
        <Row className="logo-content">
          Sua Marca
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
            
            <FaShoppingCart />
            &nbsp; 
            <span>
              R$&nbsp; 
              {
                (valorTotalCompra)&&
                valorTotalCompra.toFixed(2)
              }
              {/* {
                (valorTotalCompra >= regrasDesconto[0].valor)&&
                <>&nbsp;<span style={{ color: "red" }}>{regrasDesconto[0].desconto_percentual} % off</span></>
              }  */}
            </span>
            
          </Col>
          
        </Row>
        </Container>
      </HeaderContent>
      
    </>
  )
}
