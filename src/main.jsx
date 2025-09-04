import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SupabaseProvider } from './supabase/index.js'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SupabaseProvider>
)
