import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pageParts/Layout"
import TopPage from "./pages/TopPage/TopPage"
import PostImagePage from "./pages/PostImagePage/PostImagePage"
import LiveChatLevitationPage from "./pages/FramerMotionPages/LiveChatLevitation"
import LiveChatPage from "./pages/FramerMotionPages/LiveChat"
import { TailwindOpacity } from "./pages/TailwindOpacity"
import OtherPage from "./pages/OtherPage/OtherPage"
import ControllerPage from "./pages/FramerMotionPages/Controller"
import BehaviorAnimatePresencePage from "./pages/FramerMotionPages/BehaviorAnimatePresence"
import BehaviorMotionDivPage from "./pages/FramerMotionPages/Behavior-motionDivPage"
import TailwindGridGap from "./pages/TailwindGridGap/TailwindGridGap"
import ElementPosition from "./pages/ElementPosition/ElementPosition"
import ReactPlayerPage from "./pages/ReactPlayer/ReactPlayerPage"
import { ExcessPropertyPage } from "./pages/TypeScript/ExcessPropertyPage"
import ReactTooltipPage from "./pages/ReactTooltip/ReactTooltip"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="post-image-page" element={<PostImagePage />} />
          <Route path="animate-presence">
            <Route index element={<div>path確認して!</div>} />
            <Route path="behavior-animate-presence" element={<BehaviorAnimatePresencePage />} />
            <Route path="behavior-motion-div" element={<BehaviorMotionDivPage />} />
            <Route path="live-chat" element={<LiveChatPage />} />
            <Route path="live-chat-levitation" element={<LiveChatLevitationPage />} />
            <Route path="controller" element={<ControllerPage />} />
          </Route>
          <Route path="tailwind">
            <Route path="opacity" element={<TailwindOpacity />} />
            <Route path="grid-gap" element={<TailwindGridGap />} />
          </Route>
          <Route path="typescript">
            <Route path="excess-property" element={<ExcessPropertyPage />} />
          </Route>
          <Route path="react-player" element={<ReactPlayerPage />} />
          <Route path="element-position" element={<ElementPosition />} />
          <Route path="react-tooltip" element={<ReactTooltipPage />} />
          <Route path="other" element={<OtherPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
