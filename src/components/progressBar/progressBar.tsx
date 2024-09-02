interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const qualities: { [percent: number]: { quality: string; style: string } } = {
    0: {
      quality: "Weak",
      style: "bg-red-500 w-1/4",
    },
    25: {
      quality: "Medium",
      style: "bg-yellow-500 w-1/2",
    },
    50: {
      quality: "Strong",
      style: "bg-green-500 w-3/4",
    },
    75: {
      quality: "Very Strong",
      style: "bg-green-500 w-full",
    },
  };

  const RenderQuality = qualities[percent] || "Week";

  return (
    <div className="w-40 h-5 bg-gray-200 rounded">
      <div
        className={`h-5 ${RenderQuality.style} rounded flex items-center text-white/80 font-medium justify-center`}
      >
        {RenderQuality.quality}
      </div>
    </div>
  );
}
