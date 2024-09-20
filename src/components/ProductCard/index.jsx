import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProductCard.css";
import { useState } from "react";

const ProductCard = (props) => {
  const {
    image,
    title,
    price,
    onClickProduct,
    percentOff,
    productId,
    categoryId,
  } = props;
  const [favorites, setFavorites] = useState(false);
  const increasedValue = price + price * (7 / 100);
  return (
    <div
      onClick={() => onClickProduct(productId, categoryId)}
      className="product-card-root"
    >
      <div className="product-image-root">
        {image ? <img src={image} alt="product-img" /> : null}
      </div>
      <div className={`product-details ${!price ? "cat-details" : ""}`}>
        <div className="product-title">
          <h4 className={!price ? "prod-title-text" : ""}>{title}</h4>
          {price && (
            <button
              onClick={() => setFavorites(!favorites)}
              className="favorite-btn"
            >
              <FavoriteIcon htmlColor={favorites ? "#DC0D0D" : "#E6E6E6"} />
            </button>
          )}
        </div>
        {price &&
        <div className="product-price">
          <h4>₹{price || ""}</h4>
          <h5>₹{parseInt(increasedValue) || ""}</h5>
          <h6>{percentOff || ""}</h6>
        </div>}
      </div>
    </div>
  );
};

export default ProductCard;
