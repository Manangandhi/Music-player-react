const ListItems = () => {
  return (
    <ul style={{ marginTop: "10px" }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((li) => {
        return (
          <li
            style={{
              background: "black",
              width: "400px",
              height: "70px",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                alt="song_logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ22H-et3cLZZfMf8uFawJt_8y3nZ-Y1u2wWg&usqp=CAU"
                style={{
                  verticalAlign: "middle",
                  width: "48px",
                  height: "48px",
                  borderRadius: "56px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ marginLeft: "10px", textAlign: "left" }}>
                  <span style={{ color: "white", fontSize: "18px" }}>
                    Starboy
                  </span>
                  <p style={{ color: "grey", fontSize: "14px" }}>The Weekend</p>
                </div>
                <div>
                  <span
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      padding: "10px",
                    }}
                  >
                    12:20
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListItems;
