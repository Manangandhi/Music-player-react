import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import globalContext from "../../context/globalContext";
import "./PlaylistSection.css";

const PlaylistSection = () => {
  const {
    playLists,
    selectedPlaylist,
    setCurrentViewResponsive,
    // Graphql API data
    playListLoading,
    // Handle Change function
    handleSelectPlayList,
  } = useContext(globalContext);

  const handleClickPlaylist = (li) => {
    handleSelectPlayList(li);
    setCurrentViewResponsive("songs");
  };

  return (
    <div className="navigation-container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify_logo"
        className="logo-container"
      />

      <div className="navigation-list-container">
        <ul>
          {playListLoading ? (
            <CircularProgress color="primary" sx={styles.loadingStyle} />
          ) : (
            playLists?.map((li) => {
              return (
                <li
                  key={li?.id}
                  onClick={() => handleClickPlaylist(li)}
                  className="navigation-item-container"
                  style={{
                    color:
                      selectedPlaylist && selectedPlaylist?.id === li?.id
                        ? "white"
                        : "rgba(255, 255, 255, 0.50)",
                  }}
                >
                  {li?.title}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  loadingStyle: {
    width: "100%",
    marginTop: "30px",
  },
};

export default PlaylistSection;
