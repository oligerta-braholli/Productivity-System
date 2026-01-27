import './Card.css';

/**
 * Card Component
 * Återanvändar container för innehål
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Kortets innehål
 * @param {string} [props.title] - Kort titel
 * @param {string} [props.className] - Ytterligare CSS-klasser
 * @param {string} [props.padding='md'] - Inre avstånd: 'sm', 'md', 'lg'
 * 
 * @example
 * <Card title="Aktiviteter">
 *   <p>Kort innehål här</p>
 * </Card>
 */
export function Card({ 
  children, 
  title, 
  className = '', 
  padding = 'md' 
}) {
  return (
    <div className={`card card--padding-${padding} ${className}`}>
      {title && <h2 className="card__title">{title}</h2>}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
}

export default Card;
