import { LinearProgress } from "@mui/material";
import coverPhoto from "../images/Cover.png";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrow from "@mui/icons-material/PlayArrow";

const PlayerSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        height: "100%",
        paddingLeft: "140px",
        paddingRight: "140px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 4,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "20px",
            textAlign: "left",
            width: "100%",
          }}
        >
          Viva La Vida
        </h1>

        <span
          style={{
            color: "grey",
            fontSize: "12px",
            textAlign: "left",
            width: "100%",
          }}
        >
          Coldplay
        </span>

        {/* Cover photo */}
        <img
          src={coverPhoto}
          alt="cover"
          style={{
            width: "100%",
            height: "auto",
            marginTop: "20px",
          }}
        />

        {/* Progress bar */}

        <LinearProgress
          variant="determinate"
          value={50}
          sx={{
            width: "100%",
            display: "flex",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "15px",
              height: "35px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <MoreHorizIcon sx={{ color: "white", padding: "5px" }} />
          </button>
          <div>
            <FastRewindIcon sx={{ color: "white", padding: "5px" }} />

            <button
              type="button"
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                height: "33px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <PlayArrow sx={{ color: "black", padding: "5px" }} />
            </button>
            <FastForwardIcon sx={{ color: "white", padding: "5px" }} />
          </div>
          <button
            type="button"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "15px",
              height: "35px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <VolumeUpIcon sx={{ color: "white", padding: "5px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSection;
