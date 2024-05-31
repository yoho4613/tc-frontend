import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.tsx";
import TermsAndConditions from "./TermsAndConditions.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import ContactUs from "./ContactUs.tsx";
import BoardPage from "./BoardPage.tsx";
import PostPage from "./Post/PostPage.tsx";

import ProfilePage from "./ProfilePage.tsx";
import CreateCapsulePage from "./CreateCapsulePage.tsx";
import CreatePage from "./Post/CreatePage.tsx";

function App() {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/TermsAndConditions" Component={TermsAndConditions} />
          <Route path="/ContactUs" Component={ContactUs} />
          <Route path="/board" Component={BoardPage} />
          <Route path="/board/post/:id" Component={PostPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/createCapsule" Component={CreateCapsulePage} />
          <Route path="/post/create" Component={CreatePage} />
          <Route Component={NotFoundPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
