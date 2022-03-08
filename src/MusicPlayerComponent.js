import NavigationBar from "./NavigationBar/NavigationBar";
import PlayerSection from "./PlayerSection/PlayerSection";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import { useState } from "react";

const MusicPlayerComponent = () => {
  const [selectedState, setSelectedState] = useState();

  const handleSelectPlayList = (selectedPlaylist) => {
    setSelectedState(selectedPlaylist);
  };

  return (
    <>
      <div className="navigation-container">
        <NavigationBar
          handleSelectPlayList={handleSelectPlayList}
          selectedState={selectedState}
        />
      </div>

      <div className="sidebar-container">
        <Sidebar selectedState={selectedState} />
      </div>

      <div className="player-container">
        <PlayerSection />
      </div>
    </>
  );
};

export default MusicPlayerComponent;
