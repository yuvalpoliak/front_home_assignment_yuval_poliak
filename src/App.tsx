import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { AtAddProvider } from "./context/AtAddRecipe";
import MainPage from "./pages/mainPage/MainPage";

function App() {
  return (
    <AtAddProvider>
      <>
        <Navbar />
        <MainPage />
      </>
    </AtAddProvider>
  );
}

export default App;
