import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';

const SpanTitle = styled.span`
font: 400 16px Poppins;
// color: var(--color-title-modal);
// text-transform: uppercase;
`;

const SpanBtn = styled.span`
  color: var(--color-background);
  font: 700 16px Roboto;
`;

const ButtonEnviar = styled.button`
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 3px;
  background: var(--color-button);
`;

export default function Index(props) {
  
  const[ obsItem ] = useState("");
  const { modal, toggle, quantidade, nome, idProduto, handleChangeObservacao, itens } = props;

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}><SpanTitle>Observação para o item <b>{nome}</b></SpanTitle></ModalHeader>
      <ModalBody>
        <Input type="textarea" name="obsItem" value={itens.observacao} onChange={e => handleChangeObservacao(e, idProduto, quantidade)}/>
      </ModalBody>
      <ModalFooter>
        <ButtonEnviar onClick={() => toggle()} ><SpanBtn>Enviar</SpanBtn></ButtonEnviar>
      </ModalFooter>  
    </Modal>      
  )
}
