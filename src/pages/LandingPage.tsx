import React from "react";
import "../styles/App.css";
import Footer from "../Components/Footer.tsx";

function LandingPage() {
  return (
    <div className="LandingPage-background">
      <div className="Site-container">
        <div className="h-full flex items-center justify-start">
          <div>
            <h3 className="text-white text-2xl mb-4">
              Download Capsule Board Now
            </h3>
            <a
              className=" inline-block"
              target="_blank"
              href="https://apps.apple.com/us/app/capsule-board/id6499257665"
            >
              <img
                src="/images/app_store_icon.svg"
                alt="MOOW logo"
                className="Landing-logo"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="Site-container">
        <div className="Landing-title pt-8">Pure imagination</div>

        <div className="Site-content">
          Our platform is an invitation-only gateway to a world where your
          digital assets' security meets conveninence and innovation.
          <br />
          With MOOW, you gain not just a cloud storage but a partner in
          navigating the web3 landscape.
          <br />
          Join Our Mailing List
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
