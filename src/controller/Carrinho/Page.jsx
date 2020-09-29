import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header';
import InfoAdicional from '../../components/InfoAdicional';
import PageTitle from '../../components/PageTitle';
import ListaProdutos from '../../views/Carrinho/ListaProdutos';
import ResumoPedido from '../../views/Carrinho/ResumoPedido';
import styled from 'styled-components';

// const ContentArea = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
// `;

export default function Page(props) {
  const { itensUsuarios, decrementaProduto, incrementaProduto, loading, checkout, handleCepOnChange, clienteEndereco } = props;
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
              />
            </Col>
          </Row>
        {/* </ContentArea> */}
      </Container>
      
    </>
  )
}
