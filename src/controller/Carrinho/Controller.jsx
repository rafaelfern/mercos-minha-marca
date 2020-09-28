import React, { useState, useEffect } from 'react';
import Page from './Page';
import api from '../../services/api';

function Controller() {

  const [ itensUsuarios, setItensUsuarios ] = useState([{}]);

  useEffect(
    () => {
      getItensUsuario();
    },[]
  )

  const getItensUsuario = async _ => {
    const responseItens = await api.get('/carrinho');
    setItensUsuarios(responseItens.data);
  }

  return (
    <>
      <Page itensUsuarios={itensUsuarios} />
    </>
  )
}

export default Controller;