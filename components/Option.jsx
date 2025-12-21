export default function Option({ valueArray }) {
    return valueArray.map(item => {
        const value = item.value ?? item
        const text = item.name ?? item
       
        return (
            <option key={value} value={value}>
                {text}
            </option>
        )
    })
}