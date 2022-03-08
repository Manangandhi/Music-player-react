import { LinearProgress } from "@mui/material";
import coverPhoto from "../images/Cover.png";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrow from "@mui/icons-material/PlayArrow";
import "./PlayerSection.css";

const PlayerSection = () => {
  return (
    <div className="playersection-main-wrapper">
      <div className="playersection-wrapper">
        <h1 className="title-content">Viva La Vida</h1>

        <span className="subTitle-content">Coldplay</span>

        {/* Cover photo */}
        <img src={coverPhoto} alt="cover" className="cover-photo-style" />

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
            <FastRewindIcon sx={styles.commonButtonWrapper} />

            <button type="button" className="play-button">
              <PlayArrow sx={styles.playButton} />
            </button>
            <FastForwardIcon sx={styles.commonButtonWrapper} />
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
  optionButton: { color: "white", padding: "5px" },
  commonButtonWrapper: { color: "white", padding: "5px" },
  playButton: { color: "black", padding: "5px" },
};
