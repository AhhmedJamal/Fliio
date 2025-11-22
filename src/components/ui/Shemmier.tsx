interface ShimmerProps {
  count?: number;
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  backGroundColor?: string;
}

const Shimmer = ({
  count = 4,
  width = "w-24",
  height = "h-5",
  rounded = "rounded",
  className = "",
  backGroundColor = "bg-neutral-600",
}: ShimmerProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`relative overflow-hidden block mx-auto ${width} ${height} ${rounded} ${backGroundColor} `}
        >
          <span className="shimmer-bar" />
        </span>
      ))}
    </div>
  );
};

export default Shimmer;
