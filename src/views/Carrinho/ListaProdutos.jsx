import React from 'react';
import CardProduto from '../../components/CardProduto';

export default function ListaProdutos(props) {
  const { itensUsuarios, alteraProdutoQtd, valorProduto, loading, calculaValorProduto } = props;
  
  return (
    <>
      {
        Object.values(itensUsuarios).map((item, i) => {
          let valorProdutoPorQuantidade = item.valor_unitario;
          if(item.quantidade > 1) valorProdutoPorQuantidade = item.valor_unitario * item.quantidade;
          // calculaValorProduto(item.quantidade, item.valor_unitario);
          return(
            <CardProduto 
              id={item.id} 
              nome={item.nome}
              valorUnitario={item.valor_unitario} 
              quantidade={item.quantidade} 
              urlImagem={item.url_imagem} 
              sku={item.sku}
              valorProduto={valorProduto}
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
