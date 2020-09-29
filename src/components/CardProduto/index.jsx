import React from 'react';
import { Card, Col, Row, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { FaRegCommentAlt, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CardComponent = styled.div`
  height: 115px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-bottom);
  margin-top: 10px;
  margin-bottom: 15px;

  .item-img-content {
    margin: 10px 40px 15px 10px;
  }
  .item-nome {
    font: 400 14px Roboto;
  }
  .item-sku {
    font: 500 12px Roboto;
    line-height: 20px;
    color: var(--color-item-sku);
  }
  .item-comentario {
    margin-top: 5px;
    color: var(--color-button);
    font: 500 12px Roboto;
  }
  .item-info-content {
    margin-right: 20px;
  }
  .item-qtd-content {
    margin-right: 20px;
  }
  .qtd-area {
    border 1px solid var(--color-item-qtd);
    height: 35px;
    width: 140px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;svg:hover 
  }
  .qtd-area > span {
    font: 500 14px Roboto;
  }
  .qtd-area > svg:hover {
    cursor: pointer;
  }
  .item-preco-content {
    margin-right: 10px;
  }
  .item-preco-content > span {
    font: 500 14px Roboto;
  }
  .item-trash-content {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .item-trash-content > svg {
    color: var(--color-button);
    cursor: pointer;
  }
`;

export default function Index(props) {
  
  const { id, nome, valorUnitario, quantidade, urlImagem, sku, alteraProdutoQtd, loading, valorProduto, valorProdutoPorQuantidade, valorTotal } = props;

  return (
    <CardComponent>
      <Row className="item-img-content">
        <Col ><img src={urlImagem} width="90px" height="90px"/></Col>
      </Row>
      <Row className="item-info-content">
        <Col sm={12}><span className="item-nome">{nome}</span></Col>
        <Col sm={12}><span className="item-sku">SKU {sku}</span></Col>
        <Col sm={12}><span className="item-comentario icon-text"><FaRegCommentAlt />&nbsp; Adicionar observação</span></Col>
      </Row>
      <Row className="item-qtd-content">
        <Col className="qtd-area">
          <FaMinus onClick={() => alteraProdutoQtd(id, quantidade-1)}/>
          {
            (loading)
            ?
            <Spinner color="primary"/>
            :
            <>&nbsp;&nbsp; <span>{quantidade}</span> &nbsp;&nbsp; </>
          }
          <FaPlus onClick={() => alteraProdutoQtd(id, quantidade+1)} style={{color: "var(--color-button)"}} />
        </Col>
      </Row>
      <Row className="item-preco-content">
        <span>R$ {valorProdutoPorQuantidade}</span>
        <Col className="item-trash-content"><FaTrash /></Col>
      </Row>
    </CardComponent>
  )
}
