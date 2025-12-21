export default function Form({ handleSubmit, handleChange, isFirstRender }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="category">Choose a category: </label>
                <select 
                    id="category" 
                    name="category" 
                    onChange={handleChange}
                    defaultValue="animals-and-nature"
                >
                    <option value="animals-and-nature">Animals and Nature</option>
                    <option value="food-and-drink">Food and Drink</option>
                    <option value="travel-and-places">Travel and Places</option>
                    <option value="activities">Activities</option>
                    <option value="objects">Objects</option>
                    <option value="smileys-and-people">Smileys and People</option>
                    <option value="symbols">Symbols</option>
                </select>
            </div>
            <div>
                <label htmlFor="number">Number of cards: </label>
                <select 
                    id="number" 
                    name="number" 
                    onChange={handleChange}
                    defaultValue="10"
                >
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                </select>
            </div>
            <button type="submit">
                {isFirstRender ? "Start Game" : "New Game"}
            </button>
        </form>
    )
}
