import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

import { apiData } from './__mocks__/apiData'

createServer({
  models: {
    transactions: Model,
  },
  
  seeds(server) {
    server.db.loadData({
      transactions: apiData
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transactions'))
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transactions', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
