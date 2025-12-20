export default function Option({ valueArray }) {
    return valueArray.map((value) => (
        <option key={value} value={value}>
            {value}
        </option>
    ))
}
