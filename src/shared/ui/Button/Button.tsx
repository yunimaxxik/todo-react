import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = '',
    type = 'button',
    isDisabled,
    children,
    onClick,
    ...rest
  } = props;

  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
