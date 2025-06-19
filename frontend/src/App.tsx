import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pageParts/Layout";
import TopPage from "./pages/TopPage/TopPage";
import PostImagePage from "./pages/PostImagePage/PostImagePage";
import LiveChatLevitationPage from "./pages/FramerMotion/LiveChatLevitation";
import LiveChatPage from "./pages/FramerMotion/LiveChat";
import { TailwindOpacity } from "./pages/TailwindOpacity";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/post-image-page" element={<PostImagePage />} />
          <Route path="/animate-presence/live-chat" element={<LiveChatPage />} />
          <Route path="/animate-presence/live-chat-levitation" element={<LiveChatLevitationPage />} />
          <Route path="/tailwind-opacity" element={<TailwindOpacity />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
