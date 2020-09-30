import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';



export default function Index(props) {
  
  const[ obsItem ] = useState("");
  const { modal, toggle, quantidade, nome, idProduto, handleChangeObservacao, itens } = props;

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Observação para o item {nome}</ModalHeader>
      <ModalBody>
        <Input type="textarea" name="obsItem" value={itens.observacao} onChange={e => handleChangeObservacao(e, idProduto, quantidade)}/>
      </ModalBody>
      <ModalFooter>
        <Button color="success" className="btn-adiciona-obs" onClick={() => toggle()} >Enviar</Button>
      </ModalFooter>  
    </Modal>      
  )
}
