import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { FaCreditCard, FaHome } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/4022-success-animation.json';

const ModalContent = styled.div`

  .modal-header{
    background: var(--color-modal-header);
  }
  .modal-title {
    font: 700 16px Poppins;
    color: var(--color-title-modal);
    text-transform: uppercase;
  }

  input {
    border-radius: 5px;
    margin-top: 5px;
    height: 40px;
  }

  input:active,
  input:focus {
    background-color: var(--color-background);
    box-shadow: 0 0 0 0;
    font: 400 14px Roboto;
  }

  input::placeholder{
    padding-left: 4px;
    font: 400 12px Roboto;
  }
  
  .info-cartao {
    font: 700 15px Poppins;
    color: var(--color-info-adicional);
    text-transform: uppercase;
  }

  .btn-comprar {
    background: var(--color-button);
    width: 140px;
    height: 40px;
    font: 700 16px Roboto;
    border: none;
  }

`;

const MensagemSucesso = styled.span`
  display: flex;
  justify-content: center;
  font: 400 19px Poppins; 
  color: var(--color-button-comprar);
`;

const LabelForm = styled.span`
  font: 500 14px Roboto;
  margin-botttom: 10px;
  color: var(--color-label-form);
`;

export default function Index(props) {
  
  const { modal, toggle, checkout, handleCepOnChange, handlePagamento, clientePagamento, animation, clienteEndereco, loadingSave } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    
    <Modal isOpen={modal} size="lg" toggle={toggle}>
      <ModalContent>
        <Form onSubmit={checkout}>
        <ModalHeader toggle={toggle} >Já estamos finalizando!</ModalHeader>
        <ModalBody>
          {
            (animation)
            ?
            <Lottie options={defaultOptions}
              height={400}
              width={400}
            />
            :
            <>
            <Row className="mb-4 mt-4">
              <Col md={12}>
                <span className="info-cartao"><FaHome/> &nbsp; Precisamos do seu endereço pra entregar a compra</span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="cep">Cep</LabelForm><br/>
                  <Input type="number" required name="cep" placeholder="CEP sem pontuação" value={clienteEndereco.cep} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <LabelForm for="logradouro">Logradouro</LabelForm>
                  <Input type="text" required name="logradouro"  value={clienteEndereco.logradouro} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="bairro">Bairro</LabelForm>
                  <Input type="text" required name="bairro"  value={clienteEndereco.bairro} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="cidade">Cidade</LabelForm>
                  <Input type="text" required name="cidade"  value={clienteEndereco.cidade} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <LabelForm for="uf">UF</LabelForm>
                  <Input type="text" name="uf" required value={clienteEndereco.uf} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <LabelForm for="numeroEndereco">Número</LabelForm>
                  <Input type="text" name="numeroEndereco" required value={clienteEndereco.numeroEndereco} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <LabelForm for="complementoEndereco">Complemento</LabelForm>
                  <Input type="text" name="complementoEndereco" required value={clienteEndereco.complementoEndereco} onChange={e => handleCepOnChange(e)} />
                </FormGroup>
              </Col>
            </Row>
            <hr/>
            <Row className="mb-4">
              <Col md={12}>
                <span className="info-cartao"><FaCreditCard/> &nbsp; Informações de Pagamento</span>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <LabelForm for="numeroCartao">Número Cartão</LabelForm>
              </Col>
              <Col sm={10}>
                <InputMask mask="9999 9999 9999 9999" name="numeroCartao" required value={clientePagamento.numeroCartao} onChange={e => handlePagamento(e)} />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <LabelForm for="cvc">CVV</LabelForm>
              </Col>
              <Col sm={10}>
                <InputMask mask="999" required name="cvc" value={clientePagamento.cvc} onChange={e => handlePagamento(e)} />
              </Col>
            </Row>
            </>
          }
        </ModalBody>
        {
          (animation)
          ?
            <MensagemSucesso>Sua compra foi realizada com sucesso!</MensagemSucesso>
          :
          <ModalFooter>
            <Button className="btn-comprar" type="submit" >
              {
                (loadingSave)
                ?
                <Spinner size="md" color="primary"/>
                :
                <span>Comprar</span>
              }
            </Button>
          </ModalFooter>
        }
        </Form>
      </ModalContent>
    </Modal>      
  )
}
