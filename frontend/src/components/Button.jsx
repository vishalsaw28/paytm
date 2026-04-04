export function Button({ label, onClick, className = "" }) {
  const baseClasses =
    "text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full ${baseClasses} ${className}`.trim()}
    >
      {label}
    </button>
  );
}
