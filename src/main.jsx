import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Auth0Provider } from '@auth0/auth0-react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-eqq3olqazv3dbccv.us.auth0.com"
    clientId="WzEFOjZefoWbqUc0irBe05MLHZNRv8TX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>    
  </Auth0Provider>
)
