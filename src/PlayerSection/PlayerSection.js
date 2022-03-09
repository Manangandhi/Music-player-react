import { LinearProgress } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "./PlayerSection.css";
import { forwardRef } from "react";

const PlayerSection = (
  { selectedSong, playMusic, pauseMusic, rewindMusic, forwardMusic },
  playerImageRef
) => {
  return (
    <div className="playersection-main-wrapper">
      <div className="playersection-wrapper">
        <h1 className="title-content">{selectedSong?.title}</h1>

        <span className="subTitle-content">{selectedSong?.artist}</span>

        {/* Cover photo */}
        <img
          ref={playerImageRef}
          src={selectedSong?.photo}
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
            >
              <FastRewindIcon sx={styles.commonButtonWrapper} />
            </button>

            {/* Play and Pause Buttons */}

            {selectedSong?.status === "play" ? (
              <button
                onClick={() => pauseMusic()}
                type="button"
                className="play-button"
              >
                <PauseIcon sx={styles.playButton} />
              </button>
            ) : (
              <button
                onClick={() => playMusic()}
                type="button"
                className="play-button"
              >
                <PlayArrow sx={styles.playButton} />
              </button>
            )}
            <button
              onClick={() => forwardMusic(selectedSong)}
              type="button"
              className="forward-button"
            >
              <FastForwardIcon sx={styles.commonButtonWrapper} />
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

export default forwardRef(PlayerSection);

const styles = {
  progressBar: {
    width: "100%",
    display: "flex",
    marginTop: "30px",
    marginBottom: "20px",
  },
  optionButton: { color: "white", padding: "5px" },
  commonButtonWrapper: { color: "white", padding: "5px" },
  playButton: { color: "black", padding: "5px" },
};
