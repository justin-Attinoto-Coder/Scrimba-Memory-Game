export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
    const cards = data.map((emoji, index) => {
        const isSelected = selectedCards.some(card => card.index === index)
        const isMatched = matchedCards.some(card => card.index === index)
        const isFlipped = isSelected || isMatched
        
        // Debug: log emoji data for first card with details
        if (index === 0) {
            console.log('Emoji data:', emoji)
            console.log('htmlCode contents:', emoji.htmlCode)
            console.log('unicode contents:', emoji.unicode)
        }
        
        // Get the emoji character to display
        let emojiChar = '❓'
        if (emoji.htmlCode && Array.isArray(emoji.htmlCode) && emoji.htmlCode.length > 0) {
            // Join and use HTML codes like ["&#128512;"]
            emojiChar = emoji.htmlCode.join('')
            console.log('Using htmlCode:', emojiChar)
        } else if (emoji.unicode && Array.isArray(emoji.unicode) && emoji.unicode.length > 0) {
            // Convert unicode like ["U+1F600"] to actual emoji
            emojiChar = emoji.unicode.map(code => 
                String.fromCodePoint(parseInt(code.replace('U+', ''), 16))
            ).join('')
            console.log('Using unicode converted:', emojiChar)
        }
        
        return (
            <button
                key={index}
                className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleClick(emoji.name, index)}
                disabled={isFlipped}
                aria-label={isFlipped ? emoji.name : 'Hidden card'}
            >
                <div className="card-inner">
                    <div className="card-front">?</div>
                    <div className="card-back">
                        <span dangerouslySetInnerHTML={{ __html: emojiChar }} />
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
