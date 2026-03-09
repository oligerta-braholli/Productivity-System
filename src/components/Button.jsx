import '../styles/Button.css';

function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) {
  return (
    <button 
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
