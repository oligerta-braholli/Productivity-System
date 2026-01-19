import './Badge.css';

/**
 * Badge Component
 * Liten visuell märkning för status, kategorier etc
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge innehål
 * @param {string} [props.variant='neutral'] - Badge-stil: 'neutral', 'success', 'warning', 'danger', 'info'
 * @param {string} [props.size='md'] - Badge-storlek: 'sm', 'md', 'lg'
 * 
 * @example
 * <Badge variant="success">Aktivt</Badge>
 */
export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md' 
}) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {children}
    </span>
  );
}

export default Badge;
