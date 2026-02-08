interface WavyDividerProps {
  color?: string;
  flip?: boolean;
}

export function WavyDivider({ color = "#f8fafc", flip = false }: WavyDividerProps) {
  return (
    <div className="relative h-16 overflow-hidden">
      <svg
        className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1200 120L0 16.48V0h1200v120z"
          fill={color}
        />
      </svg>
    </div>
  );
}