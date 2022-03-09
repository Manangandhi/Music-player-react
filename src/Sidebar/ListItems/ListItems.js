import { CircularProgress } from "@mui/material";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import "./ListItems.css";

momentDurationFormatSetup(moment);
const ListItems = ({ songs, loading, handleSongClick, selectedSong }) => {
  return (
    <ul className="list-container">
      {loading ? (
        <CircularProgress color="primary" sx={{ marginTop: "100px" }} />
      ) : (
        songs?.map((song) => {
          return (
            <li
              onClick={() => handleSongClick(song?._id)}
              key={song?._id}
              className="list-item-container"
              style={{
                backgroundColor:
                  selectedSong === song?._id
                    ? "rgba(255, 255, 255, 0.15)"
                    : "black",
              }}
            >
              <div className="item-information-container">
                <img
                  alt="song_logo"
                  src={song?.photo}
                  className="photo-style"
                />
                <div className="info-main-container">
                  <div className="info-content">
                    <span className="title-content">{song?.title}</span>
                    <p className="artist-content">{song?.artist}</p>
                  </div>
                  <div>
                    <span className="time-style">
                      {moment
                        .duration(song?.duration, "seconds")
                        .format("H:mm:ss")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default ListItems;
