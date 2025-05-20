import { Link } from "react-router-dom";

export default function TopPage() {
  return <Component />;
}

export const Component = () => {
  return (
    <div className="text-gray-200">
      <h1 className="text-2xl">Top Page</h1>
      <div className="flex flex-col gap-2">
        <LinkWrapper to="/post-image-page">
          <ul>Post Image Page</ul>
        </LinkWrapper>
        {/* <LinkWrapper to="/animate-presence">
          <ul>Animate Presence</ul>
        </LinkWrapper> */}
        <LinkWrapper to="/animate-presence/live-chat-levitation">
          <ul>Framer Motion : live-chat-levitation</ul>
        </LinkWrapper>
        <LinkWrapper to="/animate-presence/live-chat">
          <ul>Framer Motion : live-chat</ul>
        </LinkWrapper>
      </div>
    </div>
  );
};

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const LinkWrapper = ({ to, children }: LinkProps) => {
  return (
    <Link to={to}>
      <ul className="hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">{children}</ul>
    </Link>
  );
};
