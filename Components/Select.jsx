export default function Select({ handleChange }) {
    return (
        <select onChange={handleChange} className="select">
            <option value="">Select category...</option>
            <option value="animals">Animals</option>
            <option value="food">Food</option>
            <option value="sports">Sports</option>
        </select>
    )
}
