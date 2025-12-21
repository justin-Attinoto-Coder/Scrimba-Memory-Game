export default function RegularButton({ handleClick, children }) {
    return (
        <button 
            className="button button--regular" 
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
