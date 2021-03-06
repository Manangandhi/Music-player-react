import { CircularProgress } from "@mui/material";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import globalContext from "../../../context/globalContext";
import "./SongList.css";

momentDurationFormatSetup(moment);
const SongList = ({ handleSongClick }) => {
  const { selectedSong, songsData, songsLoading } = useContext(globalContext);

  return (
    <ul className="list-container">
      {songsLoading && (
        <CircularProgress color="primary" sx={{ marginTop: "100px" }} />
      )}
      <TransitionGroup appear={true} in={songsLoading}>
        {songsData?.getSongs?.map((song, idx) => {
          return (
            <CSSTransition
              key={song._id}
              classNames="fade"
              timeout={550}
              unmountOnExit
            >
              <li
                onClick={() => handleSongClick(song, idx)}
                key={song?._id}
                className="list-item-container"
                style={{
                  backgroundColor:
                    selectedSong?._id === song?._id
                      ? "rgba(255, 255, 255, 0.15)"
                      : "",
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
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ul>
  );
};

export default SongList;
