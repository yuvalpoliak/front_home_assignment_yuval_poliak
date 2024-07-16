import { useAtAdd } from "../../context/AtAddRecipe";
import { recipe } from "../../types";
import { FaLeaf, FaFire } from "react-icons/fa";

import "./card.css";

interface props {
  cardData?: recipe;
  key: number;
}

export default function Card({ cardData }: props) {
  const { setAtAdd } = useAtAdd();
  return (
    <div className="containerCard">
      {cardData ? (
        <>
          <div className="topCard">
            <p className="cardTitle">{cardData.title}</p>
            <p className="cardContent">{cardData.content}</p>
          </div>
          <div className="bottomCard">
            <FaLeaf color={cardData.vegan ? "green" : "gray"} />
            <FaFire color={cardData.hot ? "red" : "gray"} />
          </div>
        </>
      ) : (
        <div className="emptyCard" onClick={() => setAtAdd(true)}>
          <p className="plus">+</p>
        </div>
      )}
    </div>
  );
}
