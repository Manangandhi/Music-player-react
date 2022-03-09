import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_SONGS } from "../GraphQL/songQuery";
import ListItems from "./ListItems/ListItems";
import SearchBar from "./Searchbar/SearchBar";
import "./Sidebar.css";

const Sidebar = ({ selectedState, playMusic, setNowPlaying, selectedSong }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const { data, loading } = useQuery(GET_SONGS, {
    variables: { playlistId: selectedState?.id || 1, search: searchInput },
  });

  const handleSongClick = (song, idx) => {
    setNowPlaying({
      playlistId: selectedState?.id,
      queue: data?.getSongs || [],
    });
    playMusic(song, idx);
  };
  return (
    <div className="sidebar-container">
      <h1 className="title-container">{selectedState?.title || "For You"}</h1>
      <SearchBar handleChange={handleInputChange} />
      <ListItems
        loading={loading}
        songs={data?.getSongs}
        handleSongClick={handleSongClick}
        selectedSong={selectedSong}
      />
    </div>
  );
};

export default Sidebar;
