import { useEffect, useRef, useState } from "react";
import FastAverageColor from "fast-average-color";
import NavigationBar from "./NavigationBar/NavigationBar";
import PlayerSection from "./PlayerSection/PlayerSection";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";

const fac = new FastAverageColor();

const MusicPlayerComponent = () => {
  const [selectedState, setSelectedState] = useState();
  const [selectedSong, setSelectedSong] = useState();

  const [appBgColor, setAppBgColor] = useState("black");

  const playerImageRef = useRef(null);

  const [nowPlaying, setNowPlaying] = useState({
    playlistId: null,
    queue: [],
  });

  const handleSelectPlayList = (selectedPlaylist) => {
    setSelectedState(selectedPlaylist);
  };

  const mediaElement = useRef(null);

  const playMusic = (song, idx) => {
    if (!mediaElement.current) {
      mediaElement.current = new Audio(song?.url);
    }
    if (!song) {
      mediaElement.current.play();
      return setSelectedSong((s) => ({
        ...s,
        status: "play",
        idx: idx,
        playlistId: selectedState?.id,
      }));
    }
    if (!selectedSong) {
      mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedState?.id,
      });
    } else if (selectedSong._id !== song._id) {
      mediaElement.current.pause();
      mediaElement.current.src = song.url;
      mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedState?.id,
      });
    } else {
      //  If same song is clicked again
    }
  };

  const pauseMusic = () => {
    if (selectedSong && mediaElement.current) {
      mediaElement.current.pause();
    }
    setSelectedSong((song) => ({ ...song, status: "pause" }));
  };

  const rewindMusic = () => {
    if (selectedSong) {
      let currentIdx = selectedSong.idx;
      let newIdx =
        currentIdx === 0 ? nowPlaying.queue.length - 1 : currentIdx - 1;
      playMusic(nowPlaying?.queue[newIdx], newIdx);
    }
  };

  const forwardMusic = () => {
    if (selectedSong) {
      let currentIdx = selectedSong.idx;
      let newIdx =
        currentIdx === nowPlaying.queue.length - 1 ? 0 : currentIdx + 1;
      playMusic(nowPlaying?.queue[newIdx], newIdx);
    }
  };

  useEffect(() => {
    if (selectedSong?._id && playerImageRef.current) {
      const newImg = playerImageRef.current.cloneNode(true);
      newImg.crossOrigin = "Anonymous";
      fac
        .getColorAsync(newImg)
        .then((color) => {
          setAppBgColor(
            `linear-gradient(to top, rgba(0,0,0) 0%, ${color.rgba} 100%)`
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedSong?._id]);

  return (
    <div
      className="App-container"
      style={{
        background: appBgColor,
      }}
    >
      <div className="navigation-container">
        <NavigationBar
          handleSelectPlayList={handleSelectPlayList}
          selectedState={selectedState}
        />
      </div>

      <div className="sidebar-container">
        <Sidebar
          setNowPlaying={setNowPlaying}
          selectedState={selectedState}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          selectedSong={selectedSong}
        />
      </div>

      <div className="player-container">
        <PlayerSection
          ref={playerImageRef}
          selectedSong={selectedSong}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          rewindMusic={rewindMusic}
          forwardMusic={forwardMusic}
        />
      </div>
    </div>
  );
};

export default MusicPlayerComponent;
