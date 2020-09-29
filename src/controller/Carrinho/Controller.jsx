import React, { useState, useEffect } from 'react';
import Page from './Page';
import api from '../../services/api';
import * as cep from 'cep-promise';

function Controller() {

  const [ itensUsuarios, setItensUsuarios ] = useState([{}]);
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
  })

  useEffect(
    () => {
      getItensUsuario();
    },[]
  )

  const getItensUsuario = async _ => {
    const responseItens = await api.get('/carrinho');
    setItensUsuarios(responseItens.data);
    setLoading(false);
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

  // const decrementaProduto = (idProduto, novaQtd) => {

  //   setItensUsuarios({...itensUsuarios, [idProduto-1]: { ...itensUsuarios[idProduto-1], "quantidade": novaQtd } });

  // }

  // const incrementaProduto = (idProduto, novaQtd) => {
  //   setItensUsuarios({...itensUsuarios, [idProduto-1]: { ...itensUsuarios[idProduto-1], "quantidade": novaQtd }})
  // }

  const checkout = _ => {
    // const responseNovaQtd = await api. post('/carrinho', itensObj);
  }

  return (
    <>
      <Page 
        itensUsuarios={itensUsuarios} 
        alteraProdutoQtd={alteraProdutoQtd}
        // decrementaProduto={decrementaProduto} 
        // incrementaProduto={incrementaProduto} 
        loading={loading}
        checkout={checkout}
        handleCepOnChange={handleCepOnChange}
        clienteEndereco={clienteEndereco}
        clientePagamento={clientePagamento}
        handlePagamento={handlePagamento}
      />
    </>
  )
}

export default Controller;