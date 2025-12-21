export default function ErrorCard({ handleClick }) {
    return (
        <div className="error-card">
            <h2>⚠️ Oops! Something went wrong ⚠️</h2>
            <p>Unable to load the emojis. Please try again!</p>
            <button onClick={handleClick}>🔄 Try Again</button>
        </div>
    )
}
