import Select from './components/Select'

export default function App() {
    const handleChange = (event) => {
        console.log(`Selected ${event.target.name}: ${event.target.value}`)
    }

   