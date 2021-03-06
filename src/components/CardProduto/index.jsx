import React, { useState } from 'react';
import { Col, Row, Button } from 'reactstrap';
import styled from 'styled-components';
import { FaRegCommentAlt, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import ModalObservacao from '../../components/ModalObservacao';

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
    cursor: pointer;
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
    // width: 140px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px; 
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
  .item-preco-content > .item-trash-content > span {
    font: 500 14px Roboto;
  }
  .item-preco-content > .item-trash-content > .botao-excluir-mobile{
    display:none;
  }
  .item-trash-content {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 15px;
  }
  .item-trash-content > svg {
    color: var(--color-button);
    cursor: pointer;
  }
  .item-comentario-feito {
    color: var(--color-info-adicional);
    font: 400 12px Roboto;
  }

  @media (max-width: 430px){
    flex-direction: column;
    height: auto;
    margin-bottom: 50px;

    .item-info-content{
      margin-bottom: 21px;
    }

    .item-qtd-content {
      margin-bottom: 21px;
    }

    .item-qtd-content > svg {
      width: 30px;
      height: 30px;

    }

    .item-preco-content > .item-trash-content > span {
      margin-bottom: 10px;
    }

    .item-preco-content > .item-trash-content > svg {
      display: none;
    }

    .item-preco-content > .item-trash-content > .botao-excluir-mobile {
      display: grid;
    }

    .item-preco-content > .item-trash-content > .botao-excluir-mobile > button {
      background: var(--color-button);
      border: none;
      height: 35px;
      width: 130px;
      font: 400 16px Roboto;
    }

  }

`;

export default function Index(props) {
  
  const { 
    id, 
    nome, 
    quantidade, 
    urlImagem, 
    sku, 
    alteraProdutoQtd,
    adicionaObs, 
    valorProdutoPorQuantidade, 
    deletaProduto,  
    handleChangeObservacao,
    itens,
    indexLoop,
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <CardComponent>
      <Row className="item-img-content">
        <Col ><img src={urlImagem} width="90px" height="90px"/></Col>
      </Row>
      
      <Col className="item-info-content">
        <Col><span className="item-nome">{nome}</span></Col>
        <Col><span className="item-sku">SKU {sku}</span></Col>
        <Col>
          {
            (itens[id-1])&&
              (itens[id-1].observacao)
              ?
              <span className="item-comentario-feito"><FaRegCommentAlt />&nbsp;Deixei um comentário nesse produto</span>
              :
              <span className="item-comentario icon-text" onClick={() => toggle()}><FaRegCommentAlt />&nbsp; Adicionar observação</span>
          }
        </Col>
      </Col>
      {
        (modal)&&
        <ModalObservacao 
          adicionaObs={adicionaObs} 
          itens={itens}
          nome={nome}
          quantidade={quantidade}
          modal={modal} 
          toggle={toggle} 
          idProduto={id}
          handleChangeObservacao={handleChangeObservacao}
        />
      }
      
      <Col className="qtd-area item-qtd-content">
        <FaMinus onClick={() => alteraProdutoQtd(indexLoop, quantidade-1)}/>
        &nbsp;&nbsp; <span>{quantidade}</span> &nbsp;&nbsp;
        <FaPlus onClick={() => alteraProdutoQtd(indexLoop, quantidade+1)} style={{color: "var(--color-button)"}} />
      </Col>
      <Row className="item-preco-content">
        <Col className="item-trash-content">

          <span>R$ {valorProdutoPorQuantidade}</span>

          <Col className="botao-excluir-mobile">
            <Button onClick={() => deletaProduto(id)}>Excluir</Button>
          </Col>

          <FaTrash onClick={() => deletaProduto(id)} />

        </Col>
      </Row>
    </CardComponent>
  )
}
