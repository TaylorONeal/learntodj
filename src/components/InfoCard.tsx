import { Scanlines } from './Scanlines';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}

export function InfoCard({ title, icon, children, variant = 'default' }: InfoCardProps) {
  const borderColor =
    variant === 'primary' ? 'rgba(127, 255, 212, 0.30)' :
    variant === 'secondary' ? 'rgba(255, 214, 10, 0.25)' :
    'rgba(255, 255, 255, 0.10)';

  const iconColor =
    variant === 'primary' ? '#7effdb' :
    variant === 'secondary' ? '#ffd60a' :
    '#99ffe0';

  const titleColor =
    variant === 'primary' ? '#7effdb' :
    variant === 'secondary' ? '#ffd60a' :
    '#d8efe9';

  return (
    <div
      className="relative rounded-lg overflow-hidden border animate-fade-in"
      style={{
        borderColor,
        background: '#061116',
        boxShadow: variant === 'primary'
          ? '0 0 40px rgba(0,255,184,0.06)'
          : variant === 'secondary'
          ? '0 0 40px rgba(255,214,10,0.06)'
          : 'none',
      }}
    >
      <Scanlines />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0 1px, transparent 2px), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.09) 0 1px, transparent 2px)',
          backgroundSize: '10px 10px, 14px 14px',
          mixBlendMode: 'screen',
        }}
      />
      <div className="relative z-10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span style={{ color: iconColor }}>{icon}</span>
          <h3
            className="text-[11px] font-mono uppercase tracking-[0.2em]"
            style={{ color: titleColor }}
          >
            {title}
          </h3>
        </div>
        <div className="space-y-2 text-sm font-mono" style={{ color: '#d8efe9' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
