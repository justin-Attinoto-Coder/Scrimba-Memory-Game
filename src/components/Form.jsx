export default function Form({ handleSubmit, handleChange, isFirstRender, isHidden, soundEnabled, toggleSound }) {
    return (
        <form onSubmit={handleSubmit} className={isHidden ? 'hidden' : ''}>
            <div>
                <label htmlFor="category">🎯 Choose a category: </label>
                <select 
                    id="category" 
                    name="category" 
                    onChange={handleChange}
                    defaultValue="animals-and-nature"
                >
                    <option value="animals-and-nature">🦁 Animals and Nature</option>
                    <option value="food-and-drink">🍕 Food and Drink</option>
                    <option value="travel-and-places">✈️ Travel and Places</option>
                    <option value="activities">⚽ Activities</option>
                    <option value="objects">🎨 Objects</option>
                    <option value="smileys-and-people">😊 Smileys and People</option>
                    <option value="symbols">💎 Symbols</option>
                </select>
            </div>
            <div>
                <label htmlFor="number">🃏 Number of cards: </label>
                <select 
                    id="number" 
                    name="number" 
                    onChange={handleChange}
                    defaultValue="10"
                >
                    <option value="6">6 cards (Easy)</option>
                    <option value="8">8 cards</option>
                    <option value="10">10 cards</option>
                    <option value="12">12 cards</option>
                    <option value="14">14 cards</option>
                    <option value="16">16 cards</option>
                    <option value="18">18 cards</option>
                    <option value="20">20 cards (Hard)</option>
                </select>
            </div>
            <div className="sound-toggle">
                <label htmlFor="sound-toggle" className="sound-label">
                    🔊 Sound Effects: 
                </label>
                <button 
                    type="button"
                    id="sound-toggle"
                    onClick={toggleSound}
                    className={`sound-button ${soundEnabled ? 'sound-on' : 'sound-off'}`}
                    aria-label={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
                >
                    {soundEnabled ? '🔊 ON' : '🔇 OFF'}
                </button>
            </div>
            <button type="submit">
                {isFirstRender ? "🚀 Start Game" : "🎮 New Game"}
            </button>
        </form>
    )
}
