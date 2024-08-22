import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import styles from "./styles/globalStyles.module.scss";
import { TodoContextProvider } from './hooks/useTodo';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoContextProvider>
    <App />
    </TodoContextProvider>
  </StrictMode>,
)
