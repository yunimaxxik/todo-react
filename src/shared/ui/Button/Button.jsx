import './Button.scss';

const Button = (props) => {
  const {
    className = '',
    type = 'button',
    isDisabled,
    children,
    onClick
  } = props;

  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
