import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import ModalPagamento from '../../components/ModalPagamento';

const CardContent = styled.div`
  height: 300px;
  
  // border: 1px solid var(--color-border-bottom);

  .title-content{
    padding: 10px 20px 10px 20px;
    height: 50px;
    border-bottom: 1px solid var(--color-border-bottom);
    border-radius: 2px;
  }

  .title-content > span {
    font: 700 14px Roboto;
    letter-spacing: 0.1px;
    line-height: 25px;
  }

  .table-content{
    padding: 20px;
    width: 100%;
    height: 130px;
  }

  .table-content > tr > .atributo {
    font: 400 14px Roboto; 
  }

  .table-content > tr > .valor {
    font: 500 14px Roboto;
    line-height: 20px;
    text-align: right;
  }

  .total-produtos-content {
    margin-top: 20px;
    padding-right: 0px;
    padding-left: 0px;
    // padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    font: 700 16px Roboto;
    line-height: 30px;
  }

  .button-content {
    // height: 90px;
    text-align: center;
    margin: 20px;
  }

  .button-content > button {
    border: none;
    height:50px;
    cursor: pointer;
    background: var(--color-button);
    color: var(--color-background);
    width: 100%;
    font: 700 16px Roboto;
    transition: all .3s ;
  }

  .button-content > button:hover {
    transform: scale(1.04);
  }

`;

export default function ResumoPedido(props) {
  
  const { checkout, handleCepOnChange, clienteEndereco, clientePagamento, handlePagamento, valorTotalCompra, disabled } = props;
  const [ modal, setModal ] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <CardContent>
      <Card>
        <CardHeader className="title-content"><span>RESUMO DO PEDIDO</span></CardHeader>
        <CardBody>
          <table className="table-content">
            <tr>
              <td className="atributo">Itens</td>
              <td className="valor">5</td>
            </tr>
            <tr>
              <td className="atributo">Total em produtos</td>
              <td className="valor">R$ 62.70</td>
            </tr>
            <tr>
              <td className="atributo">Descontos</td>
              <td className="valor">R$ 0.00</td>
            </tr>
          </table>
          <Col className="total-produtos-content">
            <span>Total</span>
            
            <span className="valor">
              R$ &nbsp;
              {
                (valorTotalCompra)&&
                valorTotalCompra.toFixed(2)
              }
            </span>
            
          </Col>
          <div className="button-content">
            <Button disabled={disabled} onClick={() => toggle()}><span>Finalizar a compra</span></Button>
          </div>
          {
            (modal)&&
            <ModalPagamento 
              modal={modal} 
              toggle={toggle} 
              checkout={checkout} 
              handleCepOnChange={handleCepOnChange}
              clienteEndereco={clienteEndereco}
              clientePagamento={clientePagamento}
              handlePagamento={handlePagamento}
            />
          }
        </CardBody>
      </Card>
    </CardContent>
    // <CardContent>
    //   <div className="title-content">
    //     <span>RESUMO DO PEDIDO</span>
    //   </div>
      // <table className="table-content">
      //   <tr>
      //     <td className="atributo">Itens</td>
      //     <td className="valor">5</td>
      //   </tr>
      //   <tr>
      //     <td className="atributo">Total em produtos</td>
      //     <td className="valor">R$ 62.70</td>
      //   </tr>
      //   <tr>
      //     <td className="atributo">Descontos</td>
      //     <td className="valor">R$ 0.00</td>
      //   </tr>
      // </table>
      // <div className="total-produtos-content">
      //   <span>Total</span>
        
          
      //   <span className="valor">
      //     R$ &nbsp;
      //     {
      //       (valorTotalCompra)&&
      //       valorTotalCompra.toFixed(2)
      //     }
      //   </span>
        
      // </div>
      // <div className="button-content">
      //   <Button disabled={disabled} onClick={() => toggle()}><span>Finalizar a compra</span></Button>
      // </div>
      // {
      //   (modal)&&
      //   <ModalPagamento 
      //     modal={modal} 
      //     toggle={toggle} 
      //     checkout={checkout} 
      //     handleCepOnChange={handleCepOnChange}
      //     clienteEndereco={clienteEndereco}
      //     clientePagamento={clientePagamento}
      //     handlePagamento={handlePagamento}
      //   />
      // }
    // </CardContent>
  )
}
