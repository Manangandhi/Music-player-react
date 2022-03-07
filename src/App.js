import "./App.css";
import NavigationBar from "./NavigationBar/NavigationBar";
import PlayerSection from "./PlayerSection/PlayerSection";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="navigation-container">
          <NavigationBar />
        </div>

        <div className="sidebar-container">
          <Sidebar />
        </div>

        <div className="player-container">
          <PlayerSection />
        </div>
      </div>
    </div>
  );
}

export default App;
