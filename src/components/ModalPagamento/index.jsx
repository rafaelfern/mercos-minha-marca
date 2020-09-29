import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const ModalContent = styled.div`

  .modal-title {
    font: 700 16px Roboto;
    color: var(--color-title-modal)
  }
  input {
    border-radius: 5px;
    margin-top: 5px;
  }

  input::placeholder{
    padding-left: 4px;
    font: 400 12px Roboto;
  }
`;

const LabelForm = styled.span`
  font: 500 14px Roboto;
  margin-botttom: 10px;
  color: var(--color-label-form);
`;

export default function Index(props) {
  
  const { modal, toggle, checkout, handleCepOnChange, clienteEndereco } = props;

  return (
    
    <Modal isOpen={modal} size="lg" toggle={toggle}>
      <ModalContent>
        <ModalHeader toggle={toggle} >Já estamos finalizando!</ModalHeader>
        <ModalBody>
          <Form onSubmit={() => checkout}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="cep">Cep</LabelForm><br/>
                  <Input type="number" name="cep" placeholder="CEP sem pontuação" value={clienteEndereco.cep} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <LabelForm for="logradouro">Logradouro</LabelForm>
                  <Input type="text" name="logradouro"  value={clienteEndereco.logradouro} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="bairro">Bairro</LabelForm>
                  <Input type="text" name="bairro"  value={clienteEndereco.bairro} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="cidade">Cidade</LabelForm>
                  <Input type="text" name="cidade"  value={clienteEndereco.cidade} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="uf">UF</LabelForm>
                  <Input type="text" name="uf"  value={clienteEndereco.uf} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <LabelForm for="numeroEndereco">Número</LabelForm>
                  <Input type="text" name="numeroEndereco"  value={clienteEndereco.numeroEndereco} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <LabelForm for="complementoEndereco">Complemento</LabelForm>
                  <Input type="text" name="complementoEndereco"  value={clienteEndereco.complementoEndereco} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>      
  )
}
