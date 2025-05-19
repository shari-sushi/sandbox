import { Link } from "react-router-dom";

export default function TopPage() {
  return <Component />;
}

export const Component = () => {
  return (
    <div className="text-gray-200">
      <h1 className="text-2xl">Top Page</h1>
      <div className="flex flex-col gap-2">
        <Link to="/post-image-page" className="">
          <ul className="hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">
            Post Image Page
          </ul>
        </Link>
        <Link to="/animate-presence">
          <ul className="hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">
            Animate Presence
          </ul>
        </Link>
      </div>
    </div>
  );
};
