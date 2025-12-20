export default function Option({ valueArray }) {
    return valueArray.map((value, index) => (
        <option key={index} value={value}>
            {value}
        </option>
    ))
}
