import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { ReactComponent as DefaultImage } from "../../../assets/images/icons/img_default.svg";

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <DefaultImage />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
