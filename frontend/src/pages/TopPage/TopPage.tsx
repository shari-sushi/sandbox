import { LinkWrapper } from "../../util/LinkWrapper"

export default function TopPage() {
  return <Component />
}

export const Component = () => {
  return (
    <div className="h-full text-gray-200">
      <h1 className="text-2xl mb-2">Top Page</h1>
      <div className="flex flex-col gap-3">
        {/* 1 */}
        <div>
          <div className="text-zinc-50 bg-gray-500 w-96 px-1">Framer Motion :</div>
          <div className="flex flex-col gap-1 ml-4">
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
        {/* 2 */}
        <div>
          <div className="text-white bg-gray-500 w-96 px-1">TailWind CSS:</div>
          <div className="flex flex-col gap-1 ml-4">
            <LinkWrapper to="/tailwind-opacity">
              <ul>Tailwind Opacity</ul>
            </LinkWrapper>
            <LinkWrapper to="/tailwind-grid-gap">
              <ul>Tailwind Grid Gap</ul>
            </LinkWrapper>
            <LinkWrapper to="/element-position">
              <ul>Element Position</ul>
            </LinkWrapper>
          </div>
        </div>
        <div>
          {/* 3 */}
          <div className="text-white bg-gray-500 w-96 px-1">TypeScript</div>
          <div className="flex flex-col gap-1 ml-4">
            <LinkWrapper to="/typescript/excess-property">
              <ul>Excess Property</ul>
            </LinkWrapper>
          </div>
        </div>
        <div>
          {/* last */}
          <div className="text-white bg-gray-500 w-96 px-1">The Other:</div>
          <div className="flex flex-col gap-1 ml-4">
            <LinkWrapper to="/react-player">
              <ul>React Player</ul>
            </LinkWrapper>
            <LinkWrapper to="/post-image-page">
              <ul>Post Image Page</ul>
            </LinkWrapper>
            <LinkWrapper to="/other">
              <ul>Other Page</ul>
            </LinkWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
