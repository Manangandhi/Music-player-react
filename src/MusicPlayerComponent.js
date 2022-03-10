import { useCallback, useEffect, useRef, useState } from "react";
import FastAverageColor from "fast-average-color";
import NavigationBar from "./NavigationBar/NavigationBar";
import PlayerSection from "./PlayerSection/PlayerSection";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";

const fac = new FastAverageColor();
let googleProxyURL =
  "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

const MusicPlayerComponent = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [selectedSong, setSelectedSong] = useState();

  const [appBgColor, setAppBgColor] = useState("black");

  const [nowPlaying, setNowPlaying] = useState({
    playlistId: null,
    queue: [],
  });

  const handleSelectPlayList = useCallback((selectedPlaylist) => {
    setSelectedPlaylist(selectedPlaylist);
  }, []);

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
        playlistId: selectedPlaylist?.id,
      }));
    }
    if (!selectedSong) {
      mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      });
    } else if (selectedSong._id !== song._id) {
      mediaElement.current.pause();
      mediaElement.current.src = song.url;
      mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
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
    if (selectedSong?._id) {
      const newImg = new Image();
      let newSrc = googleProxyURL + encodeURIComponent(selectedSong?.photo);
      newImg.src = newSrc;
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
  }, [selectedSong?._id, selectedSong?.photo]);

  return (
    <div
      className="App-container"
      style={{
        background: appBgColor,
        transition: `all 1s linear`,
      }}
    >
      <div className="navigation-container">
        <NavigationBar
          handleSelectPlayList={handleSelectPlayList}
          selectedPlaylist={selectedPlaylist}
        />
      </div>

      <div className="sidebar-container">
        <Sidebar
          setNowPlaying={setNowPlaying}
          selectedPlaylist={selectedPlaylist}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          selectedSong={selectedSong}
        />
      </div>

      <div className="player-container">
        <PlayerSection
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
