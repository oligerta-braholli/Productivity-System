import '../styles/Input.css';

function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  name,
  required = false 
}) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        className="input-field"
      />
    </div>
  );
}

export default Input;
