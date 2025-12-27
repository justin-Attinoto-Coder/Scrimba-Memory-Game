import { useState, useEffect, useRef } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'

export default function App() {
    const initialFormData = {category: "animals-and-nature", number: 10}
  
    // Load sound preference from localStorage
    const [soundEnabled, setSoundEnabled] = useState(() => {
        const saved = localStorage.getItem('memoryGame_soundEnabled')
        return saved !== null ? JSON.parse(saved) : true // Default to true
    })
    
    // Load music preference from localStorage
    const [musicEnabled, setMusicEnabled] = useState(() => {
        const saved = localStorage.getItem('memoryGame_musicEnabled')
        return saved !== null ? JSON.parse(saved) : true // Default to true
    })
    
    // Music state
    const [musicContext, setMusicContext] = useState(null)
    const [musicOscillator, setMusicOscillator] = useState(null)
    
    // Sound functions - Super Mario style!
    const playSound = (frequency, duration, type = 'sine', volume = 0.3) => {
        if (!soundEnabled) return // Don't play if sounds are disabled
        
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = frequency
        oscillator.type = type
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
    }
    
    const playFlipSound = () => {
        // Bouncy flip sound like Mario jumping
        playSound(523, 0.1, 'square', 0.2) // C
        setTimeout(() => playSound(659, 0.1, 'square', 0.2), 50) // E
    }
    
    const playMatchSound = () => {
        // Happy coin collection melody
        playSound(523, 0.15, 'sine', 0.3) // C
        setTimeout(() => playSound(659, 0.15, 'sine', 0.3), 80) // E
        setTimeout(() => playSound(784, 0.15, 'sine', 0.3), 160) // G
        setTimeout(() => playSound(1047, 0.2, 'sine', 0.4), 240) // C (octave higher)
    }
    
    const playErrorSound = () => {
        // Sad pipe sound
        playSound(220, 0.3, 'sawtooth', 0.2) // A (lower)
        setTimeout(() => playSound(196, 0.3, 'sawtooth', 0.2), 150) // G
        setTimeout(() => playSound(175, 0.3, 'sawtooth', 0.2), 300) // F
    }
    
    const playWinSound = () => {
        // Triumphant level complete fanfare
        playSound(523, 0.2, 'triangle', 0.4) // C
        setTimeout(() => playSound(659, 0.2, 'triangle', 0.4), 150) // E
        setTimeout(() => playSound(784, 0.2, 'triangle', 0.4), 300) // G
        setTimeout(() => playSound(1047, 0.3, 'triangle', 0.5), 450) // C (high)
        setTimeout(() => playSound(1319, 0.4, 'triangle', 0.6), 600) // E (high)
    }
    
    // Background music functions
    const startBackgroundMusic = () => {
        if (!musicEnabled || musicContext) return // Don't start if disabled or already playing
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Set up a simple chiptune melody
        oscillator.type = 'square'
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime) // Quiet background music
        
        // Create a simple melody pattern
        const melody = [
            { freq: 523, duration: 0.4 }, // C
            { freq: 659, duration: 0.4 }, // E
            { freq: 784, duration: 0.4 }, // G
            { freq: 659, duration: 0.4 }, // E
            { freq: 523, duration: 0.4 }, // C
            { freq: 440, duration: 0.4 }, // A (lower)
            { freq: 494, duration: 0.4 }, // B
            { freq: 523, duration: 0.8 }, // C (longer)
        ]
        
        let currentTime = audioContext.currentTime
        
        // Play the melody once, then loop
        const playMelody = () => {
            melody.forEach(note => {
                oscillator.frequency.setValueAtTime(note.freq, currentTime)
                currentTime += note.duration
            })
        }
        
        playMelody()
        
        // Set up looping
        oscillator.frequency.setValueAtTime(523, currentTime) // Reset to C
        
        setMusicContext(audioContext)
        setMusicOscillator(oscillator)
        
        oscillator.start(audioContext.currentTime)
    }
    
    const stopBackgroundMusic = () => {
        if (musicOscillator) {
            musicOscillator.stop()
            setMusicOscillator(null)
        }
        if (musicContext) {
            musicContext.close()
            setMusicContext(null)
        }
    }
    
    // Toggle functions
    const toggleSound = () => {
        const newSoundEnabled = !soundEnabled
        setSoundEnabled(newSoundEnabled)
        localStorage.setItem('memoryGame_soundEnabled', JSON.stringify(newSoundEnabled))
    }
    
    const toggleMusic = () => {
        const newMusicEnabled = !musicEnabled
        setMusicEnabled(newMusicEnabled)
        localStorage.setItem('memoryGame_musicEnabled', JSON.stringify(newMusicEnabled))
        
        if (!newMusicEnabled) {
            stopBackgroundMusic()
        } else if (isGameOn) {
            startBackgroundMusic()
        }
    }
  
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [formData, setFormData] = useState(initialFormData)
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isError, setIsError] = useState(false)
    const [moves, setMoves] = useState(0)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [feedback, setFeedback] = useState('')
  
    useEffect(() => {
        if (selectedCards.length === 2) {
            setMoves(prev => prev + 1)
            if (selectedCards[0].name === selectedCards[1].name) {
                setMatchedCards(prev => [...prev, ...selectedCards])
                setFeedback('✨ Perfect Match! ✨')
                playMatchSound()
                setTimeout(() => {
                    setFeedback('')
                    setSelectedCards([])
                }, 1500)
            } else {
                setFeedback('❌ Try Again! ❌')
                playErrorSound()
                setTimeout(() => {
                    setFeedback('')
                    setSelectedCards([])
                }, 1500)
            }
        }
    }, [selectedCards])
  
    useEffect(() => {
        if (emojisData.length && matchedCards.length === emojisData.length) {
            setAreAllCardsMatched(true)
            setEndTime(Date.now())
            playWinSound()
            stopBackgroundMusic()
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
            console.log('API Response sample:', data[0]) // Debug: check data structure
            console.log('Full first emoji:', JSON.stringify(data[0], null, 2)) // See complete structure
            const dataSlice = getDataSlice(data)
            const emojisArray = getEmojisArray(dataSlice)
          
            setEmojisData(emojisArray)
            setIsGameOn(true)
            setMoves(0)
            setStartTime(Date.now())
            setEndTime(null)
            startBackgroundMusic()
        } catch(err) {
            console.error(err)
            setIsError(true)
        } finally {
            setIsFirstRender(false)
        }
    }

    function getDataSlice(data) {
        // First, deduplicate the data array based on unicode or htmlCode
        const uniqueData = data.filter((emoji, index, self) => 
            index === self.findIndex(e => 
                (e.unicode && e.unicode === emoji.unicode) || 
                (e.htmlCode && e.htmlCode === emoji.htmlCode)
            )
        )
        
        const randomIndices = getRandomIndices(uniqueData)
        return randomIndices.reduce((arr, idx) => {
            arr.push(uniqueData[idx])
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
            const j = Math.floor(Math.random() * (i + 1));
            [paired[i], paired[j]] = [paired[j], paired[i]]
        }
        return paired
    }
  
    function turnCard(name, index) {
        setSelectedCards(prev => {
            if (prev.length >= 2) return [{name, index}]
            if (prev.some(c => c.index === index)) return prev
            playFlipSound()
            return [...prev, {name, index}]
        })
    }
  
    function resetGame() {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
        setMoves(0)
        setStartTime(null)
        setEndTime(null)
        stopBackgroundMusic()
    }
  
    function resetError() {
        setIsError(false)
    }
  
    return (
        <main>
            <h1>🎮 Memory Game 🎮</h1>
            {!isError &&
                <Form
                    handleSubmit={startGame}
                    handleChange={handleFormChange}
                    isFirstRender={isFirstRender}
                    isHidden={isGameOn}
                    soundEnabled={soundEnabled}
                    toggleSound={toggleSound}
                    musicEnabled={musicEnabled}
                    toggleMusic={toggleMusic}
                />
            }
            {isGameOn && !areAllCardsMatched && 
                <div className="score-display">
                    <div className="score-item">
                        Moves
                        <span>{moves}</span>
                    </div>
                    <div className="score-item">
                        Matched
                        <span>{matchedCards.length / 2} / {emojisData.length / 2}</span>
                    </div>
                    {feedback && <div className="feedback-message">{feedback}</div>}
                </div>
            }
            {isGameOn &&
                <MemoryCard
                    handleClick={turnCard}
                    data={emojisData}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}
                />
            }
            {areAllCardsMatched && <GameOver handleClick={resetGame} onBackToMenu={resetGame} moves={moves} time={Math.floor((endTime - startTime) / 1000)} />}
            {isError && <ErrorCard handleClick={resetError} />}
        </main>
    )
}