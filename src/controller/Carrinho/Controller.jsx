import React, { useState, useEffect } from 'react';
import Page from './Page';
import api from '../../services/api';
import * as cep from 'cep-promise';

function Controller() {

  const [ itensUsuarios, setItensUsuarios ] = useState([{}]);
  const [ valorTotalCompra, setValorTotalCompra ] = useState();
  const [ valorTotalSemDesc, setValorTotalSemDesc ] = useState();
  const [ valorDesconto, setValorDesconto ] = useState();
  const [ quantidadeTotal, setQuantidadeTotal ] = useState();
  const [ disabled, setDisabled ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ loadingSave, setLoadingSave ] = useState(false);
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
  const [ animation, setAnimation ] = useState(false);

  useEffect(
    () => {
      getItensUsuario();
      getRegrasDesconto();
    },[valorFiltro]
  )
console.log("valorTotalSemDesc= ",valorTotalSemDesc);
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

  //Aplicação das regras de desconto
  const atualizaValorDesconto = _ => {
    if(regrasDesconto !== undefined) {
      
      if(valorTotalSemDesc >= regrasDesconto[0].valor) {
        aplicaDescontoPercentual(regrasDesconto[0].desconto_percentual);
      }
    
      if(quantidadeTotal >= regrasDesconto[1].valor){
        aplicaDescontoPercentual(regrasDesconto[1].desconto_percentual);
      }

      if(valorTotalSemDesc >= regrasDesconto[0].valor && quantidadeTotal >= regrasDesconto[1].valor){
        
        if(regrasDesconto[1].desconto_percentual > regrasDesconto[0].desconto_percentual){
          aplicaDescontoPercentual(regrasDesconto[1].desconto_percentual);
          return;
        }
        aplicaDescontoPercentual(regrasDesconto[0].desconto_percentual);
      }

    }
  }

  const aplicaDescontoPercentual = desconto => {
    let novoValorDesconto = 0;
    novoValorDesconto = (valorTotalSemDesc * desconto) / 100;
    setValorDesconto(novoValorDesconto);
    setValorTotalCompra(valorTotalSemDesc - novoValorDesconto);
  }

  const deletaProduto = idProduto => {
    setItens(Object.values(itens).filter(item => {
      return item.id !== idProduto;
    }))
    setItensUsuarios(Object.values(itensUsuarios).filter(item => {
      return item.id !== idProduto;
    }))
    setValorDesconto(0);
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

  const alteraProdutoQtd = (indexLoop, novaQtd) => {
    // setItens({...itens, [idProduto-1]: { ...itens[idProduto-1], "id": idProduto, "quantidade": novaQtd } });
    // setItensUsuarios({...itensUsuarios, [idProduto-1]: { ...itensUsuarios[idProduto-1], "quantidade": novaQtd }  });
    setItens({...itens, [indexLoop]: { ...itens[indexLoop], "id": indexLoop+1, "quantidade": novaQtd } });
    setItensUsuarios({...itensUsuarios, [indexLoop]: { ...itensUsuarios[indexLoop], "quantidade": novaQtd }  });
  }

  const adicionaObs = (idProduto, obsTxt) => {
    setItens({ ...itens, [idProduto-1]: {...itens[idProduto-1], "observacao": obsTxt } });
  }

  const checkout = async e => {
    e.preventDefault();
    setLoadingSave(true);

    let endereco = {
      "rua": clienteEndereco.logradouro,
      "bairro": clienteEndereco.bairro,
      "numero": parseInt(clienteEndereco.numeroEndereco)
    }

    let cartao = {
      "numero": clientePagamento.numeroCartao,
      "cvc": clientePagamento.cvc
    }

    let objPost = { itens, endereco, cartao };
    
    const response = await api. post('/carrinho', objPost);

    if(response.data.id){
      setAnimation(true);      
    }
    setLoadingSave(false);
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
        quantidadeTotal={quantidadeTotal}
        adicionaObs={adicionaObs}
        handleChangeObservacao={handleChangeObservacao}
        handleSearchProduto={handleSearchProduto}
        itens={itens}
        valorFiltro={valorFiltro}
        loadingSave={loadingSave}
        animation={animation}
        valorTotalSemDesc={valorTotalSemDesc}
        setValorTotalSemDesc={setValorTotalSemDesc}
        valorDesconto={valorDesconto}
      />
    </>
  )
}

export default Controller;