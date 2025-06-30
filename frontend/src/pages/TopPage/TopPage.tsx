import { LinkWrapper } from "../../util/LinkWrapper";

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
        <LinkWrapper to="/tailwind-opacity">
          <ul>Tailwind Opacity</ul>
        </LinkWrapper>
        <LinkWrapper to="/other">
          <ul>Other Page</ul>
        </LinkWrapper>
      </div>
    </div>
  );
};
