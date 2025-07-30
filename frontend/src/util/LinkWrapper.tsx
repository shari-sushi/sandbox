import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const LinkWrapper = ({ to, children }: LinkProps) => {
  return (
    <Link to={to}>
      <ul className="hover:bg-blue-800/50 text-zinc-200 hover:text-zinc-50 hover:font-bold rounded w-fit min-w-80">{children}</ul>
    </Link>
  );
};
