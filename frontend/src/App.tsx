import Layout from "./pageParts/Layout";
import PostImagePage from "./pages/PostImagePage/PostImagePage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/post-image-page" element={<PostImagePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
