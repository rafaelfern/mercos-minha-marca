import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header';
import InfoAdicional from '../../components/InfoAdicional';
import PageTitle from '../../components/PageTitle';
import ListaProdutos from '../../views/Carrinho/ListaProdutos';
import ResumoPedido from '../../views/Carrinho/ResumoPedido';

export default function Page(props) {

  const { 
    itensUsuarios, 
    alteraProdutoQtd,
    loading, 
    checkout, 
    handleCepOnChange, 
    clienteEndereco, 
    clientePagamento, 
    handlePagamento,
    setValorTotalCompra,
    valorTotalCompra,
    deletaProduto,
    disabled,
    setDisabled,
    atualizaValorDesconto,
    regrasDesconto,
    setQuantidadeTotal
  } = props;
  
  return (
    <>
      {
        (valorTotalCompra && regrasDesconto)&&
        <Header valorTotalCompra={valorTotalCompra} regrasDesconto={regrasDesconto} />
      }
      <InfoAdicional />  
      <Container fluid={true}>
        <Row>
          <Col>
            <PageTitle title="Carrinho" />
          </Col>
        </Row>
        <Row> 
          <Col md={6}>
            {(itensUsuarios)&&
              <ListaProdutos
                itensUsuarios={itensUsuarios} 
                alteraProdutoQtd={alteraProdutoQtd}
                deletaProduto={deletaProduto}
                loading={loading}
                setDisabled={setDisabled}
                setValorTotalCompra={setValorTotalCompra}
                atualizaValorDesconto={atualizaValorDesconto}
                setQuantidadeTotal={setQuantidadeTotal}
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
              valorTotalCompra={valorTotalCompra}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Container>
      
    </>
  )
}
