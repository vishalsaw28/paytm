export function Appbar({ user = "User" }) {
  const userInitial = user?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="shadow h-14 flex justify-between px-4">
      <div className="flex flex-col justify-center h-full font-semibold">
        PayTM App
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-slate-700">Hello, {user}</div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-lg font-medium">
          {userInitial}
        </div>
      </div>
    </div>
  );
}
