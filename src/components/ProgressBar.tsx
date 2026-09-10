interface ProgressBarProps {
  progress: number;
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  progress = Number.isFinite(progress) ? Math.min(100, Math.max(0, Math.round(progress))) : 0;
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
      <div className="progress-bar" role="progressbar" aria-label={label || "Progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
