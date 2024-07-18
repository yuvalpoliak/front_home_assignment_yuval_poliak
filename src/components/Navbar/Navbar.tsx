import "./navbar.css";
import { FaBowlFood } from "react-icons/fa6";

export default function Navbar() {
  return (
    <div className="containerNavbar">
      <FaBowlFood color="black" size={"2rem"} />
      <h1>YumYumRecipes</h1>
    </div>
  );
}
