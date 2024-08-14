interface InputTextProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  className?: string;
}

export default function InputText({
  label,
  placeholder,
  name,
  type,
  className,
}: InputTextProps) {
  var thisClassName =
    "block text-gray-700 text-sm font-bold mb-2" +
    (className ? " " + className : "");

  return (
    <div className="mb-4">
      <label className={thisClassName}>{label}</label>
      <input
        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
