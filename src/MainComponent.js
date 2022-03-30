import { useCallback, useEffect, useRef, useState } from "react";
import FastAverageColor from "fast-average-color";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ListIcon from "@mui/icons-material/List";
import PlaylistSection from "./Components/PlaylistSection/PlaylistSection";
import PlayerSection from "./Components/PlayerSection/PlayerSection";
import SongListSection from "./Components/SongListSection/SongListSection";
import { useMediaQuery } from "@mui/material";
import { GET_PLAYLISTS } from "./GraphQL/playListQuery";
import { useQuery } from "@apollo/client";
import { GET_SONGS } from "./GraphQL/songQuery";
import "./assets/css/MainComponent.css";

const fac = new FastAverageColor();
let googleProxyURL =
  "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

const MainComponent = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [selectedSong, setSelectedSong] = useState();

  const [appBgColor, setAppBgColor] = useState("black");

  const [nowPlaying, setNowPlaying] = useState({
    playlistId: null,
    queue: [],
  });

  const [searchInput, setSearchInput] = useState("");

  const [playLists, setPlayLists] = useState([]);

  const [currentViewResponsive, setCurrentViewResponsive] = useState("player");

  // Audio Ref
  const mediaElement = useRef(null);

  // Reference to Progress bar
  const progressBar = useRef();

  // Animation Ref
  const animationRef = useRef();

  const isMobile = useMediaQuery("(max-width:980px)");

  const { data: playListData, loading: playListLoading } =
    useQuery(GET_PLAYLISTS);

  const handleInputChange = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const { data: songsData, loading: songsLoading } = useQuery(GET_SONGS, {
    variables: {
      playlistId: selectedPlaylist?.id,
      search: searchInput,
    },
    skip: !Boolean(selectedPlaylist?.id),
  });

  const handleSelectPlayList = useCallback((selectedPlaylist) => {
    setSelectedPlaylist(selectedPlaylist);
  }, []);

  const playMusic = (song, idx) => {
    if (!mediaElement.current) {
      mediaElement.current = new Audio(song?.url);
    }

    if (!song) {
      mediaElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      return setSelectedSong((s) => ({
        ...s,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      }));
    }
    if (!selectedSong) {
      mediaElement.current.play();

      animationRef.current = requestAnimationFrame(whilePlaying);

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
      mediaElement.current.pause();
      mediaElement.current.src = song.url;
      mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      });
    }
  };

  const pauseMusic = () => {
    if (selectedSong && mediaElement.current) {
      mediaElement.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
    setSelectedSong((song) => ({ ...song, status: "pause" }));
  };

  const whilePlaying = () => {
    if (mediaElement.current) {
      progressBar.current.value = mediaElement.current.currentTime;
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
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
    if (playListData) {
      setPlayLists(playListData.getPlaylists);
      if (!selectedPlaylist) {
        handleSelectPlayList(playListData?.getPlaylists[0]);
      }
    }
  }, [playListData, handleSelectPlayList, selectedPlaylist]);

  // Image Gredient
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

  useEffect(() => {
    if (mediaElement.current) {
      const seconds = Math.floor(mediaElement.current.duration);
      progressBar.current.max = seconds;
    }
  }, []);

  const handleRangeChange = () => {
    mediaElement.current.currentTime = progressBar.current.value;
  };

  return (
    <div
      className="App-container"
      style={{
        background: appBgColor,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {(!isMobile || currentViewResponsive === "playlist") && (
        <PlaylistSection
          setCurrentViewResponsive={setCurrentViewResponsive}
          handleSelectPlayList={handleSelectPlayList}
          selectedPlaylist={selectedPlaylist}
          loading={playListLoading}
          playLists={playLists}
        />
      )}

      {(!isMobile || currentViewResponsive === "songs") && (
        <SongListSection
          setNowPlaying={setNowPlaying}
          selectedPlaylist={selectedPlaylist}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          selectedSong={selectedSong}
          handleInputChange={handleInputChange}
          data={songsData}
          loading={songsLoading}
        />
      )}
      {(!isMobile || currentViewResponsive === "player") && (
        <PlayerSection
          selectedSong={selectedSong}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          rewindMusic={rewindMusic}
          forwardMusic={forwardMusic}
          isMobile={isMobile}
          mediaElement={mediaElement}
          progressBar={progressBar}
          handleRangeChange={handleRangeChange}
        />
      )}
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
