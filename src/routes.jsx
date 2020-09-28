import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Carrinho from './controller/Carrinho/Controller';

function Routes() {
  return(
    <BrowserRouter>
        <Route path="/" exact component={Carrinho} />
    </BrowserRouter>
  )
}

export default Routes;