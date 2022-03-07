const PlayerSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            color: "white",
            fontSize: "20px",
            textAlign: "left",
            marginTop: "100px",
            marginLeft: "150px",
          }}
        >
          Viva La Vida
        </h1>

        <span
          style={{
            color: "grey",
            fontSize: "12px",
            textAlign: "left",
            marginLeft: "150px",
            marginTop: "10px",
          }}
        >
          Coldplay
        </span>
      </div>
    </div>
  );
};

export default PlayerSection;
