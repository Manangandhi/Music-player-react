import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.08);",
        p: "2px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: 400,
        marginTop: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, color: "white", width: "100%" }}
          placeholder="Search Song, Artist"
          inputProps={{ "aria-label": "Search Song, Artist" }}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", color: "white" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default SearchBar;
