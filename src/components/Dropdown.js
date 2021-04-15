import React from 'react'
import PropTypes from 'prop-types';

const Dropdown = ({value, data, onChange, placeholder, name}) => {
    const handleChange = (event) => {        
        onChange(event);
    }

    return (
        <div className='form-group'>
            <select required value={value} className='form-control' onChange={handleChange} name={name}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option key={key} value={item.key}>
                        {item.value}
                    </option>
                ))}
            </select>
        </div>
    )
}

Dropdown.propTypes = {
    value: PropTypes.string,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Dropdown;