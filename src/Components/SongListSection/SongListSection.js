import ListItems from "./SongList/SongList";
import SearchBar from "./Searchbar/SearchBar";
import "./SongListSection.css";

const Sidebar = ({
  selectedPlaylist,
  playMusic,
  setNowPlaying,
  selectedSong,
  handleInputChange,
  data,
  loading,
}) => {
  const handleSongClick = (song, idx) => {
    setNowPlaying({
      playlistId: selectedPlaylist?.id,
      queue: data?.getSongs || [],
    });
    playMusic(song, idx);
  };
  return (
    <div className="sidebar-container">
      <h1 className="title-container">
        {selectedPlaylist?.title || "For You"}
      </h1>
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
