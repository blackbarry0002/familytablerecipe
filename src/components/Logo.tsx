export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Family Table logo"
    >
      <rect width="48" height="48" rx="14" fill="oklch(0.65 0.22 50)" />

      {/* Fork — left */}
      <line x1="15" y1="11" x2="15" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="11" x2="18" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21" y1="11" x2="21" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 17 Q15 20 18 20 Q21 20 21 17" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="18" y1="20" x2="18" y2="37" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Spoon — right */}
      <ellipse cx="31" cy="15" rx="4" ry="5.5" stroke="white" strokeWidth="1.8" />
      <line x1="31" y1="20.5" x2="31" y2="37" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Subtle divider line */}
      <line x1="24.5" y1="12" x2="24.5" y2="36" stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
    </svg>
  );
}
