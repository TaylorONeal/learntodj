interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}

export function InfoCard({ title, icon, children, variant = 'default' }: InfoCardProps) {
  const variantStyles = {
    default: '',
    primary: 'border-primary/30 bg-primary/5',
    secondary: 'border-secondary/30 bg-secondary/5'
  };

  return (
    <div className={`glass-card rounded-xl p-4 border border-border/50 ${variantStyles[variant]} animate-fade-in`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={variant === 'primary' ? 'text-primary' : variant === 'secondary' ? 'text-secondary' : 'text-muted-foreground'}>
          {icon}
        </span>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
