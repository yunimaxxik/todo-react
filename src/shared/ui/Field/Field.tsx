import React from 'react';
import './Field.scss';

interface FieldProps {
  className?: string;
  id: string;
  label: string;
  type?: 'text' | 'search' | 'number' | 'password' | 'email';
  value: string;
  error?: string;
  onInput: (event: React.InputEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    value,
    error,
    onInput,
    ref
  } = props;

  return (
    <div className={`field ${className}`}>
      <label
        className="field__label"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`field__input ${error ? 'is-invalid' : ''}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={ref}
      />
      {error && (
        <span
          className="field__error"
          title={error}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
