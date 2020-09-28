import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header';
import InfoAdicional from '../../components/InfoAdicional';
import PageTitle from '../../components/PageTitle';
import ListaProdutos from '../../views/Carrinho/ListaProdutos';
import ResumoPedido from '../../views/Carrinho/ResumoPedido';
import styled from 'styled-components';

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function Page(props) {
  const { itensUsuarios } = props;
  return (
    <>
      <Header />    
      <InfoAdicional />  
      <Container fluid={true}>
        <Row >
          <PageTitle title="Carrinho" />
        </Row>
        <ContentArea> 
          <Col>  
            {(itensUsuarios)&&
              <ListaProdutos itensUsuarios={itensUsuarios}/>
            }
          </Col>
          <Col>
            <ResumoPedido />
          </Col>
        </ContentArea>
      </Container>
      
    </>
  )
}
