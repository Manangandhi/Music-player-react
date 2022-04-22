import { useContext, useEffect, useRef } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ListIcon from "@mui/icons-material/List";
import PlaylistSection from "./Components/PlaylistSection/PlaylistSection";
import PlayerSection from "./Components/PlayerSection/PlayerSection";
import SongListSection from "./Components/SongListSection/SongListSection";
import "./assets/css/MainComponent.css";
import globalContext from "./context/globalContext";
import FastAverageColor from "fast-average-color";

const MainComponent = () => {
  const {
    currentViewResponsive,
    setCurrentViewResponsive,
    // Mobile Width
    isMobile,
    selectedSong,
  } = useContext(globalContext);

  const divRef = useRef();

  // Image Gredient
  useEffect(() => {
    const fac = new FastAverageColor();
    let googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    if (selectedSong?._id) {
      const newImg = new Image();
      let newSrc = googleProxyURL + encodeURIComponent(selectedSong?.photo);
      newImg.src = newSrc;
      newImg.crossOrigin = "Anonymous";
      fac
        .getColorAsync(newImg)
        .then((color) => {
          divRef.current.style.backgroundColor = color.rgba;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedSong?._id, selectedSong?.photo]);

  return (
    <div
      className="App-container"
      style={{
        flexDirection: isMobile ? "column" : "row",
      }}
      ref={divRef}
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
