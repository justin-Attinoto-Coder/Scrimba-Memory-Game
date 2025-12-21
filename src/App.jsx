import { useState, useEffect } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import AssistiveTechInfo from './components/AssistiveTechInfo'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'

export default function App() {
    const initialFormData = {category: "animals-and-nature", number: 10}
  
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [formData, setFormData] = useState(initialFormData)
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isError, setIsError] = useState(false)
  
    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards(prev => [...prev, ...selectedCards])
        }
    }, [selectedCards])
  
    useEffect(() => {
        if (emojisData.length && matchedCards.length === emojisData.length) {
            setAreAllCardsMatched(true)
        }
    }, [matchedCards, emojisData])
  
    function handleFormChange(e) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
  
    async function startGame(e) {
        e.preventDefault()
      
        try {
            const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
          
            if (!response.ok) throw new Error("Could not fetch data from API")
          
            const data = await response.json()
            const dataSlice = getDataSlice(data)
            const emojisArray = getEmojisArray(dataSlice)
          
            setEmojisData(emojisArray)
            setIsGameOn(true)
        } catch(err) {
            console.error(err)
            setIsError(true)
        } finally {
            setIsFirstRender(false)
        }
    }

    function getDataSlice(data) {
        const randomIndices = getRandomIndices(data)
        return randomIndices.reduce((arr, idx) => {
            arr.push(data[idx])
            return arr
        }, [])
    }

    function getRandomIndices(data) {
        const arr = []
        for (let i = 0; i < formData.number / 2; i++) {
            let rand
            do { rand = Math.floor(Math.random() * data.length) }
            while (arr.includes(rand))
            arr.push(rand)
        }
        return arr
    }

    function getEmojisArray(data) {
        const paired = [...data, ...data]
        for (let i = paired.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [paired[i], paired[j]] = [paired[j], paired[i]]
        }
        return paired
    }
  
    function turnCard(name, index) {
        setSelectedCards(prev => {
            if (prev.length >= 2) return [{name, index}]
            if (prev.some(c => c.index === index)) return prev
            return [...prev, {name, index}]
        })
    }
  
    function resetGame() {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
    }
  
    function resetError() {
        setIsError(false)
    }
  
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && !isError &&
                <Form
                    handleSubmit={startGame}
                    handleChange={handleFormChange}
                    isFirstRender={isFirstRender}
                />
            }
            {isGameOn && !areAllCardsMatched &&
                <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} />}
            {areAllCardsMatched && <GameOver handleClick={resetGame} />}
            {isGameOn &&
                <MemoryCard
                    handleClick={turnCard}
                    data={emojisData}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}
                />
            }
            {isError && <ErrorCard handleClick={resetError} />}
        </main>
    )
}