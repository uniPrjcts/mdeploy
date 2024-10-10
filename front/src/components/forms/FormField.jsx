import React from 'react';
import "./formfield.css";

const FormField = ({ type, id, placeholder, label, required, onChange }) => {
    return (
        <div className="form-field">
            <label className="lForm" htmlFor={id}>{label}</label>
            <input className='iForm'
                type={type}
                id={id}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
        </div>
    );
};

export default FormField;
