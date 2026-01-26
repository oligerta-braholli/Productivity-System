import './Select.css';

/**
 * Select Component
 * Återanvändar dropdown-komponent
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Select label
 * @param {string} props.value - Valt värde
 * @param {function} props.onChange - Change-handler
 * @param {Array<{value: string, label: string}>} props.options - Tillgängliga val
 * @param {boolean} [props.required=false] - Är fältet obligatoriskt
 * @param {string} [props.error] - Felmeddelande
 * 
 * @example
 * <Select
 *   label="Fokusläge"
 *   value={mode}
 *   onChange={(e) => setMode(e.target.value)}
 *   options={[
 *     { value: 'deep-work', label: 'Deep Work' },
 *     { value: 'meeting', label: 'Möte' }
 *   ]}
 * />
 */
export function Select({ 
  label, 
  value, 
  onChange, 
  options = [],
  required = false,
  error = '',
  ...rest
}) {
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="select-group">
      <label htmlFor={selectId} className="select-group__label">
        {label}
        {required && <span className="select-group__required">*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={`select-group__select ${error ? 'select-group__select--error' : ''}`}
        {...rest}
      >
        <option value="">-- Välj ett alternativ --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-group__error">{error}</span>}
    </div>
  );
}

export default Select;
