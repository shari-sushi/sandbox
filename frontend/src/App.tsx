import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pageParts/Layout";
import TopPage from "./pages/TopPage/TopPage";
import PostImagePage from "./pages/PostImagePage/PostImagePage";
import LiveChatPage from "./pages/Motion/LiveChatPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/post-image-page" element={<PostImagePage />} />
          <Route path="/animate-presence" element={<LiveChatPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
