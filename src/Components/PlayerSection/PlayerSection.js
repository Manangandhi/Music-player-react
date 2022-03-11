import { LinearProgress } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PlaceholderImage from "../../assets/images/player-placeholder.png";
import "./PlayerSection.css";

const PlayerSection = ({
  selectedSong,
  playMusic,
  pauseMusic,
  rewindMusic,
  forwardMusic,
  isMobile,
}) => {
  return (
    <div
      className="playersection-main-wrapper"
      style={{ padding: isMobile ? "4%" : "8%" }}
    >
      <div className="playersection-wrapper">
        <h1 className="title-content">{selectedSong?.title}</h1>

        <span className="subTitle-content">{selectedSong?.artist}</span>

        {/* Cover photo */}
        <img
          src={selectedSong?.photo || PlaceholderImage}
          alt="cover"
          className="cover-photo-style"
        />

        {/* Progress bar */}

        <LinearProgress
          variant="determinate"
          value={50}
          sx={styles.progressBar}
        />

        {/* Player Buttons */}
        <div className="button-container">
          <button type="button" className="option-button">
            <MoreHorizIcon sx={styles.optionButton} />
          </button>
          <div>
            {/* Rewind Button */}
            <button
              onClick={() => rewindMusic(selectedSong)}
              type="button"
              className="rewind-button"
              disabled={!selectedSong}
            >
              <FastRewindIcon
                sx={
                  !selectedSong
                    ? styles.buttonDisabled
                    : styles.commonButtonWrapper
                }
              />
            </button>

            {/* Play and Pause Buttons */}

            {selectedSong?.status === "play" ? (
              <button
                onClick={() => pauseMusic()}
                type="button"
                className="play-button"
                disabled={!selectedSong}
              >
                <PauseIcon sx={styles.playButton} />
              </button>
            ) : (
              <button
                onClick={() => playMusic()}
                type="button"
                className="play-button"
                disabled={!selectedSong}
              >
                <PlayArrow sx={styles.playButton} />
              </button>
            )}
            <button
              onClick={() => forwardMusic(selectedSong)}
              type="button"
              className="forward-button"
              disabled={!selectedSong}
            >
              <FastForwardIcon
                sx={
                  !selectedSong
                    ? styles.buttonDisabled
                    : styles.commonButtonWrapper
                }
              />
            </button>
          </div>
          <button type="button" className="volume-button">
            <VolumeUpIcon sx={styles.commonButtonWrapper} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSection;

const styles = {
  progressBar: {
    width: "100%",
    display: "flex",
    marginTop: "30px",
    marginBottom: "20px",
  },
  optionButton: { color: "white" },
  commonButtonWrapper: { color: "white" },
  playButton: { color: "black" },
  buttonDisabled: {
    color: "gray",
    padding: "5px",
  },
};
