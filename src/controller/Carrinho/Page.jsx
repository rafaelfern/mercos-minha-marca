import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header';
import InfoAdicional from '../../components/InfoAdicional';
import PageTitle from '../../components/PageTitle';
import ListaProdutos from '../../views/Carrinho/ListaProdutos';

export default function Page() {
  return (
    <>
      <Header />    
      <InfoAdicional />  
      <Container fluid={true}>
        <PageTitle title="Carrinho" />
        <ListaProdutos />
      </Container>
      
    </>
  )
}
