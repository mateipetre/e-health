import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import App from './App';
import store from './store'; // Adjust the import path if necessary
import '@fontsource/abeezee';

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}> {/* Wrap the app with QueryClientProvider */}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);