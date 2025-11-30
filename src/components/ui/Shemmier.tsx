import { Key } from "react";
interface ShimmerProps {
  count?: number;
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  backGroundColor?: string;
}

const Shimmer = ({
  count = 1,
  className = "",
  backGroundColor = "bg-neutral-300",
}: ShimmerProps) => {
  return (
    <div className="flex gap-4 container  mx-auto justify-center items-center">
      {Array.from({ length: count }).map(
        (_: unknown, i: Key | null | undefined) => (
          <span
            key={i}
            className={`relative overflow-hidden block ${className} ${backGroundColor} `}
          >
            <span className="shimmer-bar" />
          </span>
        )
      )}
    </div>
  );
};

export default Shimmer;