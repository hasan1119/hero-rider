import React from "react";
import About from "./About/About";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import Information from "./Information/Information";

const Home = () => {
  return (
    <div>
      <Banner />
      <Information />
      <About />
      <Features />
    </div>
  );
};

export default Home;
