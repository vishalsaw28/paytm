export function Balance({ value = 0 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold text-lg">Rs {value}</div>
    </div>
  );
}
