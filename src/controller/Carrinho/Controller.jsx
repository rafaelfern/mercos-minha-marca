import React, { useState, useEffect } from 'react';
import Page from './Page';
import api from '../../services/api';
import * as cep from 'cep-promise';

function Controller() {

  const [ itensUsuarios, setItensUsuarios ] = useState([{}]);
  const [ valorTotalCompra, setValorTotalCompra ] = useState();
  const [ disabled, setDisabled ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ clienteEndereco, setClienteEndereco ] = useState({
    cep: '',
    logradouro: '',
    numeroEndereco: '',
    complementoEndereco: '',
    bairro: '',
    cidade: '',
    uf: '',
  });
  const [ clientePagamento, setClientePagamento ] = useState({
    numeroCartao: '',
    cvc: '',
  });
  const [ regrasDesconto, setRegrasDesconto ] = useState();

  useEffect(
    () => {
      getItensUsuario();
      getRegrasDesconto();
      // atualizaValorDesconto();
    },[]
  )

  const getItensUsuario = async _ => {
    const responseItens = await api.get('/carrinho');
    setItensUsuarios(responseItens.data);
    setLoading(false);
  }
  
  const getRegrasDesconto = async _ => {
    const responseDesconto = await api.get('/politicas-comerciais');
    setRegrasDesconto(responseDesconto.data);
  }

  const atualizaValorDesconto = _ => {
    if(regrasDesconto !== undefined) {
      regrasDesconto.map(( desconto, i) => {
        if(desconto.tipo === "valor_minimo"){
          if(valorTotalCompra >= desconto.valor) {
            aplicaDescontoPercentual(desconto.desconto_percentual);
          }
        }
      })
    }
  }

  const aplicaDescontoPercentual = desconto => {
    let novoValorDesconto = 0;
    novoValorDesconto = (valorTotalCompra * desconto) / 100;
    setValorTotalCompra(valorTotalCompra - novoValorDesconto);
  }

console.log("Regras dwesconto - ",regrasDesconto);

  const deletaProduto = idProduto => {
    setItensUsuarios(itensUsuarios.filter((item, i) => {
      return item.id !== idProduto;
    }))
  }

  const handlePagamento = event => {
    const { name, value } = event.target;
    setClientePagamento({ ...clientePagamento, [name]: value });
  }

  const handleCepOnChange = event => {
    
    const { name, value } = event.target;
    if (value.length === 8) {
      cep(value).then(vl =>{
        setClienteEndereco({
            ...clienteEndereco,
            [name]: value,
            logradouro: vl.street, 
            cidade: vl.city,
            bairro: vl.neighborhood, 
            uf: vl.state 
        })
      })
    }else {
      setClienteEndereco({ ...clienteEndereco, [name]: value });
    }
  }

  const alteraProdutoQtd = (idProduto, novaQtd) => {

    setItensUsuarios({...itensUsuarios, [idProduto-1]: { ...itensUsuarios[idProduto-1], "quantidade": novaQtd } });

  }

  const checkout = _ => {
    // const responseNovaQtd = await api. post('/carrinho', itensObj);
  }

  return (
    <>
      <Page 
        itensUsuarios={itensUsuarios} 
        alteraProdutoQtd={alteraProdutoQtd}
        setValorTotalCompra={setValorTotalCompra}
        setDisabled={setDisabled}
        valorTotalCompra={valorTotalCompra}
        loading={loading}
        checkout={checkout}
        handleCepOnChange={handleCepOnChange}
        clienteEndereco={clienteEndereco}
        clientePagamento={clientePagamento}
        handlePagamento={handlePagamento}
        deletaProduto={deletaProduto}
        disabled={disabled}
        atualizaValorDesconto={atualizaValorDesconto}
        regrasDesconto={regrasDesconto}
      />
    </>
  )
}

export default Controller;