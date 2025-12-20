import { data } from '../data/data'
import Option from './Option'

export default function Select({ handleChange }) {
    const selectEl = Object.entries(data).map(([ key, value ]) => (
        <div key={key} className="form__inner-wrapper">
            <label htmlFor={key}>Select a {key}</label>
            <select
                name={key}
                id={key}
                onChange={handleChange}
                defaultValue=""
            >
                <option value="" disabled>Choose...</option>
                <Option valueArray={value} />
            </select>
        </div>
    ))
    
    return <>{selectEl}</>
}
