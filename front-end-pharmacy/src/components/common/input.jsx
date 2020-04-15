import React from 'react';

const Input = ({ name, label, value, onChange, error, type,isdisabled }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                className="form-control"
                disabled={isdisabled}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
export default Input;
// const Input = ({ name, isdisabled,label, error, ...rest }) => {
//     return (
//         <div className="form-group">
//             <label htmlFor={name}>{label}</label>
//             <input
//                 {...rest}
//                 id={name}
//                 name={name}
//                 className="form-control"
//                 disabled = {true}
//             />
//             {error && <div className="alert alert-danger">{error}</div>}
//         </div>
//     );
// }

//export default Input;