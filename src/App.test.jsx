import { describe, it, expect } from 'vitest'

describe('Game Over Logic', () => {
  it('should detect when all cards are matched', () => {
    // Simulate the game state
    const emojisData = [
      { name: 'dog', htmlCode: ['&#x1F436;'] },
      { name: 'cat', htmlCode: ['&#x1F431;'] },
      { name: 'dog', htmlCode: ['&#x1F436;'] },
      { name: 'cat', htmlCode: ['&#x1F431;'] }
    ]
    
    const matchedCards = [
      { name: 'dog', index: 0 },
      { name: 'dog', index: 2 },
      { name: 'cat', index: 1 },
      { name: 'cat', index: 3 }
    ]
    
    // The game over condition
    const areAllCardsMatched = emojisData.length && matchedCards.length === emojisData.length
    
    expect(areAllCardsMatched).toBe(true)
  })
  
  it('should not detect game over when cards are not all matched', () => {
    const emojisData = [
      { name: 'dog', htmlCode: ['&#x1F436;'] },
      { name: 'cat', htmlCode: ['&#x1F431;'] },
      { name: 'dog', htmlCode: ['&#x1F436;'] },
      { name: 'cat', htmlCode: ['&#x1F431;'] }
    ]
    
    const matchedCards = [
      { name: 'dog', index: 0 },
      { name: 'dog', index: 2 }
    ]
    
    // The game over condition
    const areAllCardsMatched = emojisData.length && matchedCards.length === emojisData.length
    
    expect(areAllCardsMatched).toBe(false)
  })
})
