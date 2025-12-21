import { data } from '../data/data'
import Option from './Option'

export default function Select({ handleChange }) {
    const selectEl = Object.entries(data).map(([key, value]) => (
        <div key={key} className="form__inner-wrapper">
            <label htmlFor={key}>
                {key === 'category' ? 'Choose emoji category' : 'Number of cards'}
            </label>
            <select
                name={key}
                id={key}
                onChange={handleChange}
                defaultValue=""
            >
                <option value="" disabled>
                    {key === 'category' ? 'Choose emoji category' : 'Choose number of cards'}
                </option>
                <Option valueArray={value} />
            </select>
        </div>
    ))

    return <>{selectEl}</>
}