import {
  Settings, Orbit, Speaker, Music,
  Drum, Zap, SlidersHorizontal, Waves, Flower2,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  '🏠': Speaker,
  '⚙️': Settings,
  '📈': Waves,
  '🌀': Orbit,
  '🔊': Speaker,
  '🎺': Music,
  '🥁': Drum,
  '⚡': Zap,
  '🎛️': SlidersHorizontal,
  '🌊': Waves,
  '🕉️': Flower2,
};

interface GenreIconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GenreIcon({ icon, className = 'w-5 h-5', style }: GenreIconProps) {
  const IconComponent = iconMap[icon];
  if (!IconComponent) return <span className={className}>{icon}</span>;
  return <IconComponent className={className} style={style} />;
}
