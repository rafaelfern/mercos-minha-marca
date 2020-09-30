import React, { useState, useEffect } from 'react';
import Page from './Page';
import api from '../../services/api';
import * as cep from 'cep-promise';

function Controller() {

  const [ itensUsuarios, setItensUsuarios ] = useState([{}]);
  const [ valorTotalCompra, setValorTotalCompra ] = useState();
  const [ quantidadeTotal, setQuantidadeTotal ] = useState();
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
  const [ itens, setItens ] = useState([]);
  const [ valorFiltro, setValorFiltro ] = useState('');

  useEffect(
    () => {
      getItensUsuario();
      getRegrasDesconto();
    },[valorFiltro]
  )

  const getItensUsuario = async _ => {
    let listaFiltrada = [];
    const responseItens = await api.get('/carrinho');
    
    if(valorFiltro !== ""){
      listaFiltrada = filtraLista(responseItens.data);
      setItensUsuarios(listaFiltrada);
      setDisabled(false);
      return;
    }

    setItensUsuarios(responseItens.data);
    setLoading(false);
  }
  
  const getRegrasDesconto = async _ => {
    const responseDesconto = await api.get('/politicas-comerciais');
    setRegrasDesconto(responseDesconto.data);
  }

  const atualizaValorDesconto = _ => {
    if(regrasDesconto !== undefined) {
      regrasDesconto.map( desconto => {
        if(desconto.tipo === "valor_minimo"){
          if(valorTotalCompra >= desconto.valor) {
            aplicaDescontoPercentual(desconto.desconto_percentual);
          }
        }
        if(desconto.tipo === "quantidade_itens_minima"){
          if(quantidadeTotal >= desconto.valor){
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

  const deletaProduto = idProduto => {
    setItensUsuarios(Object.values(itensUsuarios).filter((item, i) => {
      return item.id !== idProduto;
    }))
  }

  const handleSearchProduto = event => {
    const { name, value } = event.target;
    setValorFiltro(value);
  }

  const filtraLista = listaFiltrada => {
    let items = listaFiltrada;
    items = items.filter((item,index) => {
      return item.nome.toLowerCase().search(valorFiltro.toLowerCase()) !== -1;
    });
    return items;
  }

  const handleChangeObservacao = (event, idProduto, qtd) => {
    const { name, value } = event.target;
    setItens({ ...itens, [idProduto-1]: {...itens[idProduto-1], "id": idProduto, "quantidade":qtd, "observacao": value } });
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
console.log("itensUsuarios ==",itensUsuarios)
  const alteraProdutoQtd = (idProduto, novaQtd) => {
    console.log("idProduto - ",idProduto);
    setItens({...itens, [idProduto-1]: { ...itens[idProduto-1], "id": idProduto, "quantidade": novaQtd } });
    // setItensUsuarios({...itensUsuarios, [idProduto-1]: { ...itensUsuarios[idProduto-1], "quantidade": novaQtd }  });
    setItensUsuarios({...itensUsuarios, [idProduto]: { ...itensUsuarios[idProduto], "quantidade": novaQtd }  });
  }

  const adicionaObs = (idProduto, obsTxt) => {
    setItens({ ...itens, [idProduto-1]: {...itens[idProduto-1], "observacao": obsTxt } });
  }

  const checkout = async e => {
    e.preventDefault();
    let itensObj = {};

    let endereco = {
      "rua": clienteEndereco.logradouro,
      "bairro": clienteEndereco.bairro,
      "numero": parseInt(clienteEndereco.numeroEndereco)
    }

    let cartao = {
      "numero": clientePagamento.numeroCartao,
      "cvc": clientePagamento.cvc
    }

    let objPost = { itensObj, endereco, cartao };
      
    const responseNovaQtd = await api. post('/carrinho', objPost);
    console.log("response Pt - ",responseNovaQtd);
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
        deletaProduto={deletaProduto}itensObj
        disabled={disabled}
        atualizaValorDesconto={atualizaValorDesconto}
        setQuantidadeTotal={setQuantidadeTotal}
        adicionaObs={adicionaObs}
        handleChangeObservacao={handleChangeObservacao}
        handleSearchProduto={handleSearchProduto}
        itens={itens}
        valorFiltro={valorFiltro}
      />
    </>
  )
}

export default Controller;