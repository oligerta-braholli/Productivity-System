import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';
import '../styles/QuickActions.css';

function QuickActions() {
  const actions = [
    { id: 'deep-work', label: 'Start Deep Work', variant: 'primary' },
    { id: 'meeting', label: 'Start Meeting', variant: 'info' },
    { id: 'break', label: 'Take a Break', variant: 'success' }
  ];

  return (
    <Card title="⚡ Quick Actions" className="quick-actions-card">
      <div className="actions-grid">
        {actions.map((action) => (
          <Link key={action.id} to="/timer" style={{ textDecoration: 'none' }}>
            <Button variant={action.variant}>
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}

export default QuickActions;
