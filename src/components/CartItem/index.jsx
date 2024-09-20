import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from "react-redux";
import {
  handleProdQuantityUpdate,
  handleDeleteCartItem,
} from "../../redux/dashboardSlice";
import { URLS } from "../../constants";
import {apiClient} from "../../api/apiClient"

const CartItem = (props) => {
  const { cartData } = props;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const increasedValue =
    cartData?.price + cartData?.price * (7 / 100);

  const handelProductQuantity = async (prodId, shouldIncrease) => {
    if (shouldIncrease) {
      dispatch(handleProdQuantityUpdate({ prodId, shouldIncrease }));
      const response = await apiClient.post(URLS.CART_INCREASE, {
        count: 1,
        userId: userData.userId ,
        prodId: prodId
      });
      if(response.code === 200) {
        console.log("Success")
      }
    } else {
      if (cartData.quantity === 1) {
        return 
      }
      const response = await apiClient.post(URLS.CART_DECREASE,  {
        count: 1,
        userId: userData.userId ,
        prodId: prodId
      });
      if(response.code === 200) {
        console.log("Success")
      }
      dispatch(handleProdQuantityUpdate({ prodId, shouldIncrease }));
    }
  };

  const handleOnClickDelete = async (prodId) => {
    const response = await apiClient.post(URLS.CART_REMOVE, {
      userId: userData.userId ,
      prodId: prodId
    });
    if(response.code === 200) {
      console.log("Success")
    }
    dispatch(handleDeleteCartItem(prodId));
  };
console.log("datga::>",cartData)
  return (
    <div className="cart-item-root">
      <div className="prod-image-container">
        {cartData?.prodId ? (
          <img
            src={require(`../../assets/images/${cartData.prodId}.jpg`)}
            alt="product-data"
          />
        ) : null}
      </div>
      <div className="prod-text-container">
        <p>{cartData?.prodName}</p>
        <div className="prod-price">
          <h4>₹{cartData?.price}</h4>
          <h5>₹{increasedValue}</h5>
          <h6>7% off</h6>
        </div>
        <div className="quantity">
          <IconButton
            onClick={() => handelProductQuantity(cartData?.prodId, false)}
          >
            <RemoveCircleOutlineIcon htmlColor="#013678"/>
          </IconButton>
          <div>{cartData?.cartQty}</div>
          <IconButton

            onClick={() => handelProductQuantity(cartData?.prodId, true)}
          >
            <AddCircleIcon htmlColor="#013678"/>
          </IconButton>
        </div>
      </div>
      <IconButton onClick={() => handleOnClickDelete(cartData?.prodId)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;
