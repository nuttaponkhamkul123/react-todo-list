import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { TaskDataProvider } from './provider/task-data.provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskDataProvider>
      <App />
    </TaskDataProvider>
  </StrictMode>,
)
