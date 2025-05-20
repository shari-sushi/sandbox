import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-lvh w-lvw bg-zinc-800 text-white select-none">
      {/* header */}
      <div className="h-8 bg-zinc-900">
        <Link to="/" className="inline-block w-fit mx-2 bg-red-200 hover:brightness-70 rounded-2xl">
          <img src="/shari.ico" alt="Shari Icon" className="h-7 w-7" />
        </Link>
      </div>
      {/* body */}
      <div className="px-2 pt-1">{children}</div>
    </div>
  );
}

export default Layout;
