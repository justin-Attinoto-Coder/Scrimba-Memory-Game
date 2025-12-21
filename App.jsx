import Select from './components/Select'

export default function App() {
    const handleChange = (event) => {
        console.log(`Selected ${event.target.name}: ${event.target.value}`)
    }

    return (
        <div className="app">
            <h1>Memory Game Settings</h1>
            <form className="form">
                <Select handleChange={handleChange} />
            </form>
        </div>
    )
}
