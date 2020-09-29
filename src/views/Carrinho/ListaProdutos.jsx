import React from 'react';
import CardProduto from '../../components/CardProduto';

export default function ListaProdutos(props) {
  const { itensUsuarios, alteraProdutoQtd, loading } = props;
  
  return (
    <>
      {
        Object.values(itensUsuarios).map((item, i) => (
          <CardProduto 
            id={item.id} 
            nome={item.nome} 
            valorUnitario={item.valor_unitario} 
            quantidade={item.quantidade} 
            urlImagem={item.url_imagem} 
            sku={item.sku}
            // icrementaProduto={incrementaProduto}
            // decrementaProduto={decrementaProduto} 
            loading={loading}
            alteraProdutoQtd={alteraProdutoQtd}
          />
        ))
      }
    </>
  )
}
