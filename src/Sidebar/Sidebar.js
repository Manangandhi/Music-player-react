import ListItems from "./ListItems/ListItems";
import SearchBar from "./Searchbar/SearchBar";

const Sidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <h1
        style={{
          textAlign: "left",
          marginTop: "30px",
          color: "white",
          fontSize: "28px",
        }}
      >
        For You
      </h1>

      <SearchBar />
      <ListItems />
    </div>
  );
};

export default Sidebar;
