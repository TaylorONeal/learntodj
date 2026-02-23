interface TerminalChromeProps {
  label: string;
  onClose?: () => void;
  actionLabel?: string;
}

export function TerminalChrome({ label, onClose, actionLabel }: TerminalChromeProps) {
  return (
    <div className="bg-black/80 px-4 py-2 flex items-center justify-between border-b border-white/[0.06] relative z-10">
      <div className="flex items-center gap-2">
        {onClose ? (
          <button
            onClick={onClose}
            className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            aria-label="Close"
          />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        )}
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[10px] text-white/40 font-mono uppercase tracking-widest">
          {label}
        </span>
      </div>
      {onClose && actionLabel && (
        <button
          onClick={onClose}
          className="text-[10px] text-white/50 font-mono uppercase tracking-widest hover:text-white/80 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
