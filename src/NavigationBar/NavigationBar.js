import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navigation-container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify_logo"
        className="logo-container"
      />

      <div className="navigation-list-container">
        <ul>
          <li className="navigation-item-container">For You</li>
          <li className="navigation-item-container">Top Tracks</li>
          <li className="navigation-item-container">Favourites</li>
          <li className="navigation-item-container">Recently Played</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
