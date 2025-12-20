import { useState } from 'react'
import Select from '../components/Select'

function App() {
  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
    cards: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <form className="form">
        <Select handleChange={handleChange} />
        <button type="submit">Start Game</button>
      </form>
    </div>
  )
}

export default App
