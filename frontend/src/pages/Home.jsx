import React from "react";
import Hero from "../components/HOme/Hero.jsx";
import RecentlyAdded from "../components/HOme/RecentlyAdded.jsx";

const Home = () => {
  return (
    <>
      <>
        <div className="bg-zinc-900 text-white">
          <Hero />
          <RecentlyAdded />
        </div>
      </>
    </>
  );
};

export default Home;
