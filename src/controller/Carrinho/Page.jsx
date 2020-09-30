import React from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
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
    handleChangeObservacao, 
    clienteEndereco, 
    clientePagamento, 
    handlePagamento,
    setValorTotalCompra,
    valorTotalCompra,
    deletaProduto,
    disabled,
    setDisabled,
    atualizaValorDesconto,
    setQuantidadeTotal,
    quantidadeTotal,
    adicionaObs,
    itens,
    valorFiltro,
    handleSearchProduto,
    loadingSave,
    animation,
    valorTotalSemDesc,
    setValorTotalSemDesc,
    valorDesconto
  } = props;
  
  return (
    <>
      <Header 
        valorTotalSemDesc={valorTotalSemDesc}
        valorTotalCompra={valorTotalCompra} 
        valorFiltro={valorFiltro}
        handleSearchProduto={handleSearchProduto}
      />
      
      <InfoAdicional />  
      <Container  fluid={true}>
        <Row>
          <Col>
            <PageTitle title="Carrinho" />
          </Col>
        </Row>
        <Row style={{ marginLeft: "50px", marginRight: "50px" }}> 
          <Col lg={8} style={{marginBottom: "40px" }}>
            { 
              (loading)
              ?
              <Col className="text-center">
                <Spinner style={{ width: "4rem", height: "4rem" }} color="primary"/>
              </Col>
              :
              (itensUsuarios)&&
              <ListaProdutos
                itensUsuarios={itensUsuarios} 
                alteraProdutoQtd={alteraProdutoQtd}
                deletaProduto={deletaProduto}
                loading={loading}
                setDisabled={setDisabled}
                setValorTotalCompra={setValorTotalCompra}
                valorTotalCompra={valorTotalCompra}
                atualizaValorDesconto={atualizaValorDesconto}
                setQuantidadeTotal={setQuantidadeTotal}
                adicionaObs={adicionaObs}
                handleChangeObservacao={handleChangeObservacao}
                itens={itens}
                setValorTotalSemDesc={setValorTotalSemDesc}
                valorTotalSemDesc={valorTotalSemDesc}
                valorDesconto={valorDesconto}
              />
            }
          </Col>
          <Col lg={4}>
            <ResumoPedido
              checkout={checkout} 
              handleCepOnChange={handleCepOnChange} 
              clienteEndereco={clienteEndereco}
              clientePagamento={clientePagamento}
              handlePagamento={handlePagamento}
              valorTotalCompra={valorTotalCompra}
              disabled={disabled}
              itens={itens}
              loadingSave={loadingSave}
              animation={animation}
              quantidadeTotal={quantidadeTotal}
              valorTotalSemDesc={valorTotalSemDesc}
              valorDesconto={valorDesconto}
            />
          </Col>
        </Row>
      </Container>
      
    </>
  )
}
