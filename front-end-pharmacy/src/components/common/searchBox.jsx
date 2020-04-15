import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <input
            type="text"
            name="query"
            className="form-control my-3"
            placeholder="Search..."
            value={value}
            onChange={e => {
                console.log('current targrt', e.currentTarget)
                onChange(e.currentTarget.value)
            }

            }
        >
        </input>
    );
}

export default SearchBox;