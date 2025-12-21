# Scrimba-Memory-Game
A scrimba led course introducing concepts for creating a memory game from Ajo Borgvold

## Components

### Select Component
The `Select` component (`components/Select.jsx`) creates multiple select dropdowns based on the data structure. It:
- Imports data from `data/data.js`
- Maps over data entries to create labeled select elements
- Uses the `Option` component to render options
- Accepts a `handleChange` callback for handling selection changes

### Option Component
The `Option` component (`components/Option.jsx`) renders individual option elements:
- Accepts a `valueArray` prop containing the list of options
- Maps over the array to create `<option>` elements

### Data Structure
The `data/data.js` file exports an object where:
- Keys represent the select field names (e.g., "difficulty", "theme", "cardCount")
- Values are arrays of options for each select field

## Usage Example

```jsx
import Select from './components/Select'

function App() {
    const handleChange = (event) => {
        console.log(`Selected ${event.target.name}: ${event.target.value}`)
    }

    return <Select handleChange={handleChange} />
}
```
