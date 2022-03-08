import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const SearchBar = ({ handleChange }) => {
  return (
    <Paper component="form" sx={styles.wrapper}>
      <div className="searchbar-container">
        <InputBase
          sx={styles.inputWrapper}
          placeholder="Search Song, Artist"
          inputProps={{ "aria-label": "Search Song, Artist" }}
          onChange={handleChange}
        />
        <IconButton sx={styles.searchIconWrapper} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default SearchBar;

const styles = {
  wrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.08);",
    p: "2px 4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: 400,
    marginTop: "15px",
  },
  inputWrapper: { ml: 1, color: "white", width: "100%" },
  searchIconWrapper: { p: "10px", color: "white" },
};
