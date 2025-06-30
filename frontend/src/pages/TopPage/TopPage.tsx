import { LinkWrapper } from "../../util/LinkWrapper";

export default function TopPage() {
  return <Component />;
}

export const Component = () => {
  return (
    <div className="text-gray-200">
      <h1 className="text-2xl">Top Page</h1>
      <div className="flex flex-col gap-3 ml-3">
        <LinkWrapper to="/post-image-page">
          <ul>Post Image Page</ul>
        </LinkWrapper>
        <div>
          <div className="text-zinc-400">Framer Motion :</div>
          <div className="flex flex-col gap-1 ml-3">
            <LinkWrapper to="/animate-presence/behavior-animate-presence">
              <ul> behavior-animate-presence</ul>
            </LinkWrapper>
            <LinkWrapper to="/animate-presence/behavior-motion-div">
              <ul> behavior-motion-div</ul>
            </LinkWrapper>
            <LinkWrapper to="/animate-presence/live-chat-levitation">
              <ul>live-chat-levitation</ul>
            </LinkWrapper>
            <LinkWrapper to="/animate-presence/live-chat">
              <ul>live-chat</ul>
            </LinkWrapper>
            <LinkWrapper to="/animate-presence/controller">
              <ul>controller</ul>
            </LinkWrapper>
          </div>
        </div>
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
