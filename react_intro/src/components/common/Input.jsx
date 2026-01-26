import './Input.css';

/**
 * Input Component
 * Återanvändar textinput-komponent
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Inputets label
 * @param {string} props.value - Inputets värde
 * @param {function} props.onChange - Change-handler
 * @param {string} [props.placeholder=''] - Placeholder-text
 * @param {string} [props.type='text'] - Input-typ
 * @param {boolean} [props.required=false] - Är fältet obligatoriskt
 * @param {string} [props.error] - Felmeddelande om det finns
 * 
 * @example
 * <Input 
 *   label="Titel" 
 *   value={title} 
 *   onChange={(e) => setTitle(e.target.value)}
 *   placeholder="Ange aktivitets titel"
 * />
 */
export function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  required = false,
  error = '',
  ...rest
}) {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-group__label">
        {label}
        {required && <span className="input-group__required">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-group__input ${error ? 'input-group__input--error' : ''}`}
        {...rest}
      />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}

export default Input;
