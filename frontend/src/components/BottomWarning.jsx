export function BottomWarning({ label, buttonText, to = "#" }) {
  return (
    <div className="py-2 text-sm flex justify-center ">
      <div>{label}</div>
      <a href={to} className="pointer underline pl-1 cursor-pointer text-blue-600">
        {buttonText}
      </a>
    </div>
  );
}
