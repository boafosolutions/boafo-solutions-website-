type Props = {
  className?: string;
};

export function BoafoLogo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={`h-7 w-auto select-none ${className ?? ""}`}
      aria-label="Boafo Solutions"
      role="img"
    >
      <text
        x="10"
        y="45"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="42"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        Boafo
      </text>
      <text
        x="148"
        y="45"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="42"
        fill="#4f46e5"
        letterSpacing="-0.02em"
      >
        .
      </text>
    </svg>
  );
}
