interface ProgressBarProps {
  progress: number;
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            {label}
          </span>
          <span className="text-[10px] font-mono" style={{ color: '#7effdb' }}>{progress}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
