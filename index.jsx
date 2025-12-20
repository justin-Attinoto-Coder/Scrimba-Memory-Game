import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client'

function App() {
    return (
        <div>
            <h1>Memory Game</h1>
            <p>Welcome to the Memory Game!</p>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
