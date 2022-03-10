import { useCallback, useEffect, useRef, useState } from "react";
import FastAverageColor from "fast-average-color";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ListIcon from "@mui/icons-material/List";
import NavigationBar from "./NavigationBar/NavigationBar";
import PlayerSection from "./PlayerSection/PlayerSection";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import { useMediaQuery } from "@mui/material";
import { GET_PLAYLISTS } from "./GraphQL/playListQuery";
import { useQuery } from "@apollo/client";
import { GET_SONGS } from "./GraphQL/songQuery";

const fac = new FastAverageColor();
let googleProxyURL =
  "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

const MusicPlayerComponent = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [selectedSong, setSelectedSong] = useState();

  const isMobile = useMediaQuery("(max-width:980px)");

  const [appBgColor, setAppBgColor] = useState("black");

  const [nowPlaying, setNowPlaying] = useState({
    playlistId: null,
    queue: [],
  });

  const [playLists, setPlayLists] = useState([]);

  const { data: playListData, loading: playListLoading } =
    useQuery(GET_PLAYLISTS);

  const [searchInput, setSearchInput] = useState("");

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
    if (playListData) {
      setPlayLists(playListData.getPlaylists);
      if (!selectedPlaylist) {
        handleSelectPlayList(playListData?.getPlaylists[0]);
      }
    }
  }, [playListData, handleSelectPlayList, selectedPlaylist]);

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

  console.log("song", songsData);

  const [currentViewResponsive, setCurrentViewResponsive] = useState("player");

  return (
    <div
      className="App-container"
      style={{
        background: appBgColor,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {(!isMobile || currentViewResponsive === "playlist") && (
        <NavigationBar
          setCurrentViewResponsive={setCurrentViewResponsive}
          handleSelectPlayList={handleSelectPlayList}
          selectedPlaylist={selectedPlaylist}
          loading={playListLoading}
          playLists={playLists}
        />
      )}

      {(!isMobile || currentViewResponsive === "songs") && (
        <Sidebar
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
        />
      )}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "max-content",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor:
                currentViewResponsive === "playlist" ? "green" : "black",
              color: "white",
              border: "none",
              margin: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
            onClick={() => setCurrentViewResponsive("playlist")}
          >
            <LibraryMusicIcon />
            <span>PlayLists</span>
          </button>
          <button
            style={{
              backgroundColor:
                currentViewResponsive === "songs" ? "green" : "black",
              color: "white",
              border: "none",
              margin: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
            onClick={() => setCurrentViewResponsive("songs")}
          >
            <ListIcon />
            <span>Songs</span>
          </button>
          <button
            style={{
              backgroundColor:
                currentViewResponsive === "player" ? "green" : "black",
              color: "white",
              border: "none",
              margin: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
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

export default MusicPlayerComponent;
