import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const LinkWrapper = ({ to, children }: LinkProps) => {
  return (
    <Link to={to}>
      <ul className="hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">{children}</ul>
    </Link>
  );
};
