import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { SearchProvider } from './components/SearchContext.jsx'

/* Importación estilo CSS */
import './style/index.css'

/* Importación de Bootstrap CSS */
import 'bootstrap/dist/css/bootstrap.min.css'

/* Importación de Bootstrap JS */
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
)
