import '../../styles/components/button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;