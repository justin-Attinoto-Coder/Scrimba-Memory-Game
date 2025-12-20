export default function RegularButton({ handleClick, children }) {
    return (
        <button type="button" onClick={handleClick} className="btn--regular">
            {children}
        </button>
    )
}
