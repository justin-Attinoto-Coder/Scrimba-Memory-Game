export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
    const cards = data.map((emoji, index) => {
        const isSelected = selectedCards.some(card => card.index === index)
        const isMatched = matchedCards.some(card => card.index === index)
        const isFlipped = isSelected || isMatched
        
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
                    <div className="card-back">{emoji.htmlCode && <span dangerouslySetInnerHTML={{ __html: emoji.htmlCode.join('') }} />}</div>
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
