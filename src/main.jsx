import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{backgroundImage:
      "linear-gradient(\n  180deg,\n  hsl(223deg 49% 25%) 0%,\n  hsl(225deg 33% 37%) 10%,\n  hsl(225deg 25% 49%) 20%,\n  hsl(225deg 32% 61%) 30%,\n  hsl(224deg 46% 73%) 40%,\n  hsl(223deg 89% 86%) 50%,\n  hsl(224deg 89% 89%) 60%,\n  hsl(224deg 89% 92%) 70%,\n  hsl(225deg 90% 95%) 80%,\n  hsl(226deg 90% 97%) 90%,\n  hsl(0deg 0% 100%) 100%\n)"
}}>
      <App />
    </div>
  </React.StrictMode>,
)
