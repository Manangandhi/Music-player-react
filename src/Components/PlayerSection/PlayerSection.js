import { useContext, useState } from "react";
import { Popover, Slider } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlaceholderImage from "../../assets/images/player-placeholder.png";
import "./PlayerSection.css";
import globalContext from "../../context/globalContext";

const PlayerSection = () => {
  const {
    selectedSong,
    playMusic,
    pauseMusic,
    rewindMusic,
    forwardMusic,
    repeatMusic,
    // Mobile Width
    isMobile,
    // Ref
    mediaElement,
    progressBar,
    // Handle Change Function
    handleRangeChange,
    next,
  } = useContext(globalContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleVolumeBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVolumeChange = (e) => {
    mediaElement.current.volume = e.target.value / 100;
  };

  return (
    <div
      className="playersection-main-wrapper"
      style={{ padding: isMobile ? "4%" : "8%" }}
    >
      <div className="playersection-wrapper">
        <h1 className="title-content">{selectedSong?.title}</h1>

        <span className="subTitle-content">{selectedSong?.artist}</span>
        <audio onEnded={next} ref={mediaElement} hidden></audio>

        {/* Cover photo */}
        <img
          src={selectedSong?.photo || PlaceholderImage}
          alt="cover"
          className="cover-photo-style"
        />

        {/* Progress bar */}

        <input
          type="range"
          ref={progressBar}
          defaultValue={0}
          style={styles.progress}
          onChange={handleRangeChange}
          disabled={!selectedSong}
        />

        {/* Player Buttons */}
        <div className="button-container">
          <button
            type="button"
            onClick={() => repeatMusic(selectedSong)}
            className="option-button"
            disabled={!selectedSong}
          >
            <RepeatIcon
              sx={
                !selectedSong
                  ? styles.buttonDisabled
                  : styles.commonButtonWrapper
              }
            />
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
                <PauseIcon
                  sx={
                    !selectedSong
                      ? styles.buttonDisabled
                      : styles.commonButtonWrapper
                  }
                />
              </button>
            ) : (
              <button
                onClick={() => playMusic(selectedSong, selectedSong?.idx)}
                type="button"
                className="play-button"
                disabled={!selectedSong}
              >
                <PlayArrow
                  sx={
                    !selectedSong
                      ? styles.buttonDisabled
                      : styles.commonButtonWrapper
                  }
                />
              </button>
            )}
            <button
              onClick={() => forwardMusic()}
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
            <VolumeUpIcon
              sx={
                !selectedSong
                  ? styles.buttonDisabled
                  : styles.commonButtonWrapper
              }
              onClick={handleVolumeBtn}
            />
          </button>
        </div>
      </div>
      <Popover
        id={"id"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Slider
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-vertical",
            },
            height: "150px",
            marginBottom: "10px",
            backgroundColor: "black",
            overflow: "hidden",
          }}
          orientation="vertical"
          defaultValue={mediaElement?.current?.volume * 100 || 100}
          aria-label="volume"
          onChange={handleVolumeChange}
        />
      </Popover>
    </div>
  );
};

export default PlayerSection;

const styles = {
  commonButtonWrapper: { color: "white" },
  playButton: { color: "black" },
  buttonDisabled: {
    color: "white",
  },
  progress: {
    width: "100%",
    display: "flex",
    marginTop: "30px",
    marginBottom: "20px",
    cursor: "pointer",
  },
};
