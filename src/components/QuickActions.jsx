import Button from './Button';
import Card from './Card';
import '../styles/QuickActions.css';

function QuickActions({ onActionClick }) {
  const actions = [
    { id: 'deep-work', label: 'Start Deep Work', variant: 'primary' },
    { id: 'meeting', label: 'Start Meeting', variant: 'info' },
    { id: 'break', label: 'Take a Break', variant: 'success' }
  ];

  return (
    <Card title="⚡ Quick Actions" className="quick-actions-card">
      <div className="actions-grid">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            onClick={() => onActionClick && onActionClick(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default QuickActions;
