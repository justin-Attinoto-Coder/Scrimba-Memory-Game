export default function Sparkle({ x, y }) {
    return (
        <div 
            className="sparkle"
            style={{
                left: `${x}px`,
                top: `${y}px`
            }}
        >
            ✨
        </div>
    )
}
