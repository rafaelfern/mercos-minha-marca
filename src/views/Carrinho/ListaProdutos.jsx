import React, { useEffect } from 'react';
import CardProduto from '../../components/CardProduto';

export default function ListaProdutos(props) {
  
  const { itensUsuarios, alteraProdutoQtd, deletaProduto, loading, setValorTotalCompra, setDisabled, atualizaValorDesconto, setQuantidadeTotal } = props;
  

  useEffect(
    () => {
      if(itensUsuarios) calculaValorTotalCompra();
      atualizaValorDesconto();   
    },[itensUsuarios]
  )

  const contaQuantidadeTotal = novaQtd => {
    setQuantidadeTotal(novaQtd);
  }

  const calculaValorTotalCompra = _ => {
    let valorTotal = 0;
    let qtdTotal = 0;
    
    Object.values(itensUsuarios).map((item, i) => { 
      let valorProdutoPorQuantidade = item.valor_unitario;
      if(item.quantidade > 1) valorProdutoPorQuantidade = item.valor_unitario * item.quantidade;
      valorTotal += valorProdutoPorQuantidade;
      qtdTotal += item.quantidade;
    })
    
    if(valorTotal === 0) setDisabled(true);
    contaQuantidadeTotal(qtdTotal);
    setValorTotalCompra(valorTotal);
  }

  return (
    <>
      {
        Object.values(itensUsuarios).map((item, i) => {

          let valorProdutoPorQuantidade = item.valor_unitario;
          if(item.quantidade > 1) valorProdutoPorQuantidade = item.valor_unitario * item.quantidade;

          return(
            <CardProduto 
              id={item.id} 
              nome={item.nome}
              valorUnitario={item.valor_unitario} 
              quantidade={item.quantidade} 
              urlImagem={item.url_imagem} 
              sku={item.sku}
              deletaProduto={deletaProduto}
              loading={loading}
              alteraProdutoQtd={alteraProdutoQtd}
              valorProdutoPorQuantidade={valorProdutoPorQuantidade}
            />
          );
        })
      }
    </>
  )
}
