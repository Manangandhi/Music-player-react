import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import FastAverageColor from "fast-average-color";
import globalContext from "./globalContext";
import { GET_PLAYLISTS } from "../GraphQL/playListQuery";
import { GET_SONGS } from "../GraphQL/songQuery";
import { useMediaQuery } from "@mui/material";

const GlobalContextProvider = ({ children }) => {
  // All States
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

  // Animation Ref
  const animationRef = useRef();

  // Audio Ref
  const mediaElement = useRef(null);

  // Reference to Progress bar
  const progressBar = useRef();

  const isMobile = useMediaQuery("(max-width:980px)");

  //  Graphql Api call
  const { data: playListData, loading: playListLoading } =
    useQuery(GET_PLAYLISTS);

  const { data: songsData, loading: songsLoading } = useQuery(GET_SONGS, {
    variables: {
      playlistId: selectedPlaylist?.id,
      search: searchInput,
    },
    skip: !Boolean(selectedPlaylist?.id),
  });

  // Functions
  const playMusic = async (song, idx, listItemFlag) => {
    if (!song) {
      mediaElement.current.src = song?.url;
      await mediaElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      setNowPlaying({
        playlistId: selectedPlaylist?.id,
        queue: songsData?.getSongs || [],
      });
      setSelectedSong((s) => ({
        ...s,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      }));
    }
    if (!selectedSong) {
      mediaElement.current.src = song?.url;
      await mediaElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      });
      setNowPlaying({
        playlistId: selectedPlaylist?.id,
        queue: songsData?.getSongs || [],
      });
    } else if (selectedSong._id !== song._id) {
      mediaElement.current.pause();
      mediaElement.current.src = song.url;
      await mediaElement.current.play();
      setSelectedSong({
        ...song,
        status: "play",
        idx: idx,
        playlistId: selectedPlaylist?.id,
      });
      setNowPlaying({
        playlistId: selectedPlaylist?.id,
        queue: songsData?.getSongs || [],
      });
    } else {
      //  If same song is clicked again
      if (listItemFlag) {
        mediaElement.current.pause();
        mediaElement.current.src = song.url;
      }
      await mediaElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
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

  // Function for select playlist
  const handleSelectPlayList = useCallback(
    (selectedPlaylist) => {
      setSelectedPlaylist(selectedPlaylist);
    },
    [setSelectedPlaylist]
  );

  // SearchInput Change
  const handleInputChange = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  // Progress bar Change
  const handleRangeChange = () => {
    mediaElement.current.currentTime = progressBar.current.value;
  };

  const next = () => {
    if (mediaElement.current.ended) {
      forwardMusic();
    }
  };

  // Progress bar Effect
  useEffect(() => {
    if (mediaElement.current) {
      const seconds = Math.floor(mediaElement.current.duration);
      progressBar.current.max = seconds;
    }
  }, [selectedSong?._id]);

  // By default select First Playlist
  useEffect(() => {
    if (playListData) {
      setPlayLists(playListData.getPlaylists);
      if (!selectedPlaylist) {
        handleSelectPlayList(playListData?.getPlaylists[0]);
      }
    }
  }, [playListData, handleSelectPlayList, selectedPlaylist, setPlayLists]);

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
          setAppBgColor(
            `linear-gradient(to top, rgba(0,0,0) 0%, ${color.rgba} 100%)`
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedSong?._id, selectedSong?.photo, setAppBgColor]);

  const value = {
    selectedPlaylist,
    setSelectedPlaylist,
    selectedSong,
    setSelectedSong,
    appBgColor,
    setAppBgColor,
    nowPlaying,
    setNowPlaying,
    searchInput,
    setSearchInput,
    playLists,
    setPlayLists,
    currentViewResponsive,
    setCurrentViewResponsive,

    // Graphql API data
    playListData,
    playListLoading,
    songsData,
    songsLoading,

    // Mobile Width
    isMobile,

    // Functions
    playMusic,
    pauseMusic,
    rewindMusic,
    forwardMusic,

    // handleChange functions
    handleSelectPlayList,
    handleRangeChange,
    handleInputChange,
    next,

    // Ref
    mediaElement,
    progressBar,
  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export default GlobalContextProvider;
