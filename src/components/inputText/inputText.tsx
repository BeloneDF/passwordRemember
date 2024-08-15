interface InputTextProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  className?: string;
  accept?: string;
}

export default function InputText({
  label,
  placeholder,
  name,
  type,
  accept,
}: InputTextProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        accept={accept}
      />
    </div>
  );
}
