import { Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import "./ProductDetails.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/ProductList";
import { addToCart, handleCartCountChange } from "../../redux/dashboardSlice";
import { handleScrollIntoView } from "../../utils/helpers";
import { apiClient } from "../../api/apiClient";
import { URLS } from "../../constants";
import { useParams } from "react-router-dom";

const InfoWrap = ({ title, children, className, style }) => {
  return (
    <div style={style || {}} className={`info-wrap-root ${className || ""}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};

const ProductDetails = (props) => {
  const { productDetails, cart } = useSelector((state) => state.dashboardSlice);
  const increasedValue =
    productDetails?.product.prodMarketPrice || productDetails?.product.productprice + productDetails?.product.prodMarketPrice || Math.floor(productDetails?.product.productprice * (7 / 100));
  const userData = JSON.parse(localStorage.getItem("userData"))

  const params = useParams();
console.log("productDetails::>",productDetails)

  const dispatch = useDispatch()

  const onAddtoCart = async (prodId) => {
    // sendMessage({ MT: "9", userId: userData.userId, prodId });
    const response = await apiClient.post(URLS.CART_INCREASE, {
      count: 1,
      userId: userData.userId,
      prodId: prodId
    });
    if (response.code === 200) {
      console.log("Success")
    }
    const cartItem = {
      price: productDetails.product.prodPrice,
      prodName: productDetails.product.prodName,
      prodId: productDetails.product.prodId,
    };
    dispatch(addToCart(cartItem))
  };

  useEffect(() => {
    handleScrollIntoView("prod", "start")
  }, [productDetails?.product.prodId]);

  useEffect(() => {
    dispatch(handleCartCountChange())
  }, [cart])

  return (
    <>
      <Grid id="prod" container className="prod-root">
        <Grid item xs={3.5}>
          <div className="prod-img">
            {productDetails?.product?.productid ? (
              <img
                src={require(`../../assets/images/${productDetails?.product?.productid}.jpg`)}
                alt="product-img"
              />
            ) : null}
          </div>
          <Grid container spacing={3.3} gap={1.5}>
            {[...Array(5)].map((_, index) => (
              <Grid item md={2} key={index}>
                {productDetails?.product?.productid ? (
                  <div className="prod-img-small">
                    <img
                      src={require(`../../assets/images/${productDetails?.product?.productid}.jpg`)}
                      alt={`product-${index + 1}`}
                    />
                  </div>
                ) : null}
              </Grid>
            ))}
          </Grid>
          <div className="button-container">
            <Button
              startIcon={<AddShoppingCartOutlinedIcon />}
              className="cart-btn"
              variant="contained"
              onClick={() => onAddtoCart(productDetails?.product?.productid)}
            >
              Add to Cart
            </Button>
            <Button
              startIcon={<LocalMallIcon />}
              className="buy-btn"
              variant="contained"
              color="secondary"
            >
              Buy Now
            </Button>
          </div>
        </Grid>
        <Grid item xs={8.5}>
          <div className="text-container">
            <h2>{productDetails?.product?.productname}</h2>
            <div className="rating-container">
              <div className="star-tag">
                <StarIcon htmlColor="#013678" />
                <p>4.2</p>
              </div>
              <p>Rated by 1896 & 512 Reviewed</p>
            </div>
            <div className="price-info">
              <h4>₹{productDetails?.product?.productprice}</h4>
              <h5>₹ {increasedValue}</h5>
              <h6>7% off</h6>
            </div>
            <div className="pincode-input">
              <LocalShippingIcon className="truck-icon" htmlColor="#0149A3" />
              <input type="number" placeholder="Enter Pincode" />
              <button className="pincode-done-btn">
                <DoneIcon htmlColor="#fff" className="done-icon" />
              </button>
            </div>
            <InfoWrap style={{ marginBottom: 20 }} title={"Highlights"}>
              <ul>
                <li>
                  Self-Timer | Type C and Mini HDMI | 9 Auto Focus Points | 35x
                  Optical Zoom., Effective Pixels: 18 MP APS-C CMOS sensor-which
                  is 25 times larger than a typical Smartphone sensor., Wi-Fi |
                  Full HD | Video Recording at 1080 p on 30fps.
                </li>
                <li>Effective Pixels: 18 MP</li>
                <li>Sensor Type: CMOS</li>
              </ul>
            </InfoWrap>
            <InfoWrap title="Description">
              <p>{productDetails?.product?.productdescription}</p>
            </InfoWrap>
          </div>
        </Grid>
      </Grid>
      <div className="similar-products">
        <ProductList
          categoryTitle="Similar Products"
          productData={
            productDetails?.similarProducts?.length
              ? productDetails.similarProducts
              : []
          }
        />
      </div>
    </>
  );
};

export default ProductDetails;
