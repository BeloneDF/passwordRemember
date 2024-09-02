export function Slider({
  value,
  setValue,
  handleChange,
}: {
  value: number;
  setValue: (value: number) => void;
  handleChange: (event: any) => void;
}) {
  return (
    <>
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 25px;
            height: 25px;
            background: #09090b;
            cursor: pointer;
            border-radius: 50%;
          }

          input[type="range"]::-moz-range-thumb {
            width: 25px;
            height: 25px;
            background: #09090b;
            cursor: pointer;
            border-radius: 50%;
          }

          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield; /* Firefox */
          }
        `}
      </style>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="block mb-2 font-medium text-gray-900 dark:text-white">
          Numbers of characters
        </h2>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="w-12 h-10 rounded-md text-center"
            value={value}
            max={50}
            onChange={(e) => {
              const newValue = Math.min(Number(e.target.value), 50);
              setValue(newValue);
            }}
          />
          <input
            id="minmax-range"
            type="range"
            min="0"
            max="50"
            value={value}
            onChange={handleChange}
            className="w-96 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-400"
          />
        </div>
      </div>
    </>
  );
}
