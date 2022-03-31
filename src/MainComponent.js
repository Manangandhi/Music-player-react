import { useContext } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ListIcon from "@mui/icons-material/List";
import PlaylistSection from "./Components/PlaylistSection/PlaylistSection";
import PlayerSection from "./Components/PlayerSection/PlayerSection";
import SongListSection from "./Components/SongListSection/SongListSection";

import "./assets/css/MainComponent.css";
import globalContext from "./context/globalContext";

const MainComponent = () => {
  const {
    appBgColor,
    currentViewResponsive,
    setCurrentViewResponsive,
    // Mobile Width
    isMobile,
  } = useContext(globalContext);

  return (
    <div
      className="App-container"
      style={{
        background: appBgColor,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {(!isMobile || currentViewResponsive === "playlist") && (
        <PlaylistSection />
      )}

      {(!isMobile || currentViewResponsive === "songs") && <SongListSection />}
      {(!isMobile || currentViewResponsive === "player") && <PlayerSection />}
      {isMobile && (
        <div className="responsive-button-container">
          <button
            className="playlist-button"
            style={{
              backgroundColor:
                currentViewResponsive === "playlist" ? "green" : "black",
            }}
            onClick={() => setCurrentViewResponsive("playlist")}
          >
            <LibraryMusicIcon />
            <span>PlayLists</span>
          </button>
          <button
            className="song-button"
            style={{
              backgroundColor:
                currentViewResponsive === "songs" ? "green" : "black",
            }}
            onClick={() => setCurrentViewResponsive("songs")}
          >
            <ListIcon />
            <span>Songs</span>
          </button>
          <button
            className="player-button"
            style={{
              backgroundColor:
                currentViewResponsive === "player" ? "green" : "black",
            }}
            onClick={() => setCurrentViewResponsive("player")}
          >
            <PlaylistPlayIcon />
            <span>Play</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
