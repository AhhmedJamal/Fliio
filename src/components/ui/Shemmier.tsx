interface ShimmerProps {
  count?: number;
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Shimmer = ({
  count = 4,
  width = "w-24",
  height = "h-5",
  rounded = "rounded",
  className = "",
}: ShimmerProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`relative overflow-hidden block ${width} ${height} ${rounded} bg-neutral-600`}
        >
          <span className="shimmer-bar" />
        </span>
      ))}
    </div>
  );
};

export default Shimmer;
