import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pageParts/Layout";
import TopPage from "./pages/TopPage/TopPage";
import PostImagePage from "./pages/PostImagePage/PostImagePage";
import LiveChatLevitationPage from "./pages/FramerMotion/LiveChatLevitation";
import LiveChatPage from "./pages/FramerMotion/LiveChat";
import { TailwindOpacity } from "./pages/TailwindOpacity";
import OtherPage from "./pages/OtherPage/OtherPage";
import ControllerPage from "./pages/FramerMotion/Controller";
import BehaviorAnimatePresencePage from "./pages/FramerMotion/BehaviorAnimatePresence";
import BehaviorMotionDivPage from "./pages/FramerMotion/Behavior-motionDiv";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/post-image-page" element={<PostImagePage />} />
          <Route path="/animate-presence">
            <Route index element={<div>path確認して!</div>} />
            <Route path="behavior-animate-presence" element={<BehaviorAnimatePresencePage />} />
            <Route path="behavior-motion-div" element={<BehaviorMotionDivPage />} />
            <Route path="live-chat" element={<LiveChatPage />} />
            <Route path="live-chat-levitation" element={<LiveChatLevitationPage />} />
            <Route path="controller" element={<ControllerPage />} />
          </Route>
          <Route path="/tailwind-opacity" element={<TailwindOpacity />} />
          <Route path="/other" element={<OtherPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
