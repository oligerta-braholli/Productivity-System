import './Button.css';

/**
 * Button Component
 * Återanvänbar knappkomponent med olika varianter
 * 
 * @param {Object} props - Component props
 * @param {string} props.children - Knapptext
 * @param {string} [props.variant='primary'] - Knappstil: 'primary', 'secondary', 'danger'
 * @param {string} [props.size='md'] - Knappstorlek: 'sm', 'md', 'lg'
 * @param {function} props.onClick - Click-handler
 * @param {boolean} [props.disabled=false] - Är knappen inaktiverad
 * @param {string} [props.className] - Ytterligare CSS-klasser
 * 
 * @example
 * <Button variant="primary" onClick={() => console.log('Klickad!')}>
 *   Klicka här
 * </Button>
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '' 
}) {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
