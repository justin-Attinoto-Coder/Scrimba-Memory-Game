export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
    const cards = data.map((emoji, index) => {
        const isSelected = selectedCards.some(card => card.index === index)
        const isMatched = matchedCards.some(card => card.index === index)
        const isFlipped = isSelected || isMatched
        
        // Convert unicode to actual emoji character
        let emojiChar = '❓'
        if (emoji.unicode && Array.isArray(emoji.unicode) && emoji.unicode.length > 0) {
            // Convert unicode like ["U+1F333"] to actual emoji
            emojiChar = emoji.unicode.map(code => 
                String.fromCodePoint(parseInt(code.replace('U+', '0x'), 16))
            ).join('')
        }
        
        // Debug on first flipped card
        // if (index === 0 && isFlipped) {
        //     console.log('Card 0 is flipped, emoji:', emojiChar)
        // }
        
        return (
            <button
                key={index}
                className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleClick(emoji.name, index)}
                disabled={isFlipped}
                aria-label={isFlipped ? emoji.name : 'Hidden card'}
            >
                <div className="card-inner">
                    <div className="card-front">🌟</div>
                    <div className="card-back">
                        <span>{emojiChar}</span>
                    </div>
                </div>
            </button>
        )
    })
    
    return (
        <div className="memory-cards-container">
            {cards}
        </div>
    )
}
