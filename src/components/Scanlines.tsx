export function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
      }}
    />
  );
}
