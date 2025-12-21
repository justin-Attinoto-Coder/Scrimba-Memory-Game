export default function AssistiveTechInfo({ emojisData, matchedCards }) {
    const totalCards = emojisData.length
    const matchedCount = matchedCards.length
    const remainingCount = totalCards - matchedCount
    
    return (
        <div className="assistive-info" aria-live="polite">
            <p>
                Total cards: {totalCards} | 
                Matched: {matchedCount} | 
                Remaining: {remainingCount}
            </p>
        </div>
    )
}
