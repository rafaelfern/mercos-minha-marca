import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header';
import InfoAdicional from '../../components/InfoAdicional';
import PageTitle from '../../components/PageTitle';
import ListaProdutos from '../../views/Carrinho/ListaProdutos';
import ResumoPedido from '../../views/Carrinho/ResumoPedido';
import styled from 'styled-components';

export default function Page(props) {

  const { 
    itensUsuarios, 
    decrementaProduto, 
    incrementaProduto, 
    loading, 
    checkout, 
    handleCepOnChange, 
    clienteEndereco, 
    clientePagamento, 
    handlePagamento 
  } = props;
  
  return (
    <>
      <Header />
      <InfoAdicional />  
      <Container fluid={true}>
        <Row>
          <Col>
            <PageTitle title="Carrinho" />
          </Col>
        </Row>
        {/* <ContentArea> */}
          <Row> 
            <Col md={6}>
              {(itensUsuarios)&&
                <ListaProdutos
                  itensUsuarios={itensUsuarios} 
                  incrementaProduto={incrementaProduto} 
                  decrementaProduto={decrementaProduto} 
                  loading={loading}
                />
              }
            </Col>
            <Col md={6}>
              <ResumoPedido 
                checkout={checkout} 
                handleCepOnChange={handleCepOnChange} 
                clienteEndereco={clienteEndereco}
                clientePagamento={clientePagamento}
                handlePagamento={handlePagamento}
              />
            </Col>
          </Row>
        {/* </ContentArea> */}
      </Container>
      
    </>
  )
}
