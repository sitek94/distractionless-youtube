import React from 'react';
import ReactDOM from 'react-dom';
import AppProviders from 'context';
import App from 'app';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
