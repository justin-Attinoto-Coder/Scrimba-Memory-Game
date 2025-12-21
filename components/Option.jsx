export default function Option({ valueArray }) {
    return valueArray.map(item => (
        <option key={item} value={item}>
            {item}
        </option>
    ))
}
