import React from 'react';
import { FaTruck, FaTag, FaCreditCard } from 'react-icons/fa';
import { Row, Col, Container } from 'reactstrap';
import styled from 'styled-components';

const InfoAdicional = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--color-backgroud-sub-header);
  height: 60px;
  padding: 20px 120px 20px 120px;
  color: var(--color-info-adicional);

  span {
    font: 500 12px Roboto;
  }
`;

export default function Index() {
  return (
    <InfoAdicional>
      {/* <Row> */}
        <Col className="icon-text"><FaTruck />&nbsp;<span>Delivery apenas para Joinville</span></Col>
        <Col className="icon-text"><FaTag />&nbsp;<span>Desconto de 10% nas compras acima de R$ 200,00</span></Col>
        <Col className="icon-text"><FaCreditCard /><span>Pague em até 12x no cartão</span></Col>
      {/* </Row> */}
    </InfoAdicional>
  )
}


