import SongList from "./SongList/SongList";
import SearchBar from "./Searchbar/SearchBar";
import "./SongListSection.css";
import { useContext } from "react";
import globalContext from "../../context/globalContext";

const Sidebar = () => {
  const {
    selectedPlaylist,
    // Functions
    playMusic,
    handleInputChange,
  } = useContext(globalContext);

  const handleSongClick = (song, idx) => {
    playMusic(song, idx, true);
  };
  return (
    <div className="sidebar-container">
      <h1 className="title-container">
        {selectedPlaylist?.title || "For You"}
      </h1>
      <SearchBar handleChange={handleInputChange} />
      <SongList handleSongClick={handleSongClick} />
    </div>
  );
};

export default Sidebar;
