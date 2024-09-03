export function SidebarSkeleton() {
  return (
    <aside className="w-72 bg-zinc-950 p-6 text-white animate-pulse">
      <div className="flex gap-4 p-2 items-center justify-between">
        <div className="h-8 w-32 bg-zinc-900 rounded"></div>
        <div className="w-16 h-16 bg-zinc-900 rounded-full"></div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="gap-2 flex flex-col">
          <div className="h-4 w-24 bg-zinc-900 rounded"></div>
          <div className="h-10 bg-zinc-900 rounded"></div>
        </div>
        <div className="gap-2 flex flex-col">
          <div className="h-4 w-24 bg-zinc-900 rounded"></div>
          <div className="h-10 bg-zinc-900 rounded"></div>
        </div>
        <div className="gap-2 flex flex-col">
          <div className="h-4 w-24 bg-zinc-900 rounded"></div>
          <div className="h-10 bg-zinc-900 rounded"></div>
        </div>
        <div className="flex gap-2 flex-row">
          <div className="h-10 w-1/3 bg-zinc-900 rounded"></div>
          <div className="h-10 w-2/3 bg-green-700 rounded"></div>
        </div>
      </div>
      <footer className="mt-4 text-center text-xs flex flex-col-reverse gap-4 h-3/6 ">
        <div className="h-4 w-32 bg-zinc-900 rounded"></div>
        <div className="h-10 bg-zinc-900 rounded"></div>
      </footer>
    </aside>
  );
}
