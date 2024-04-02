import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './output.css';
import LoginComponent from "./routes/Login";
import { useState } from "react";
import SignupComponent from "./routes/Signup";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import HomeComponent from "./routes/Home";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SingleListView";
import songContext from "./contexts/songContext";
import { useCookies } from "react-cookie";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused }}>
            <Routes>
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="*" element={< Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter >
    </div >
  );
}



export default App;
