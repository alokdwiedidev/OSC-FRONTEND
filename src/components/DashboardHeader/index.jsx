import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Button, Drawer, IconButton } from "@mui/material";
import { apiClient } from "../../api/apiClient";
import { URLS } from "../../constants";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import CartItem from "../CartItem";
import { styled } from "@mui/material/styles";
import CartPrice from "../CartPrice";
import { useSelector } from "react-redux";
import Status from "../Status";
import { fetchDashboardData, handleCartCountChange } from "../../redux/dashboardSlice";
import { useDispatch } from "react-redux";
import { setCartData } from "../../redux/dashboardSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 12,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: 7,
  },
}));

const DashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const firstName = userData?.fullName?.split(" ")[0];
  const { cart, cartCount } = useSelector(
    (state) => state.dashboardSlice
  );
  const increasedValue = totalCartPrice + totalCartPrice * (7 / 100);
  const dispatch = useDispatch()

  const getDashboardData = async () => {
    const payload = {
      userId: userData?.userId,
      sessionId: userData?.sessionId,
    };
    const response = await apiClient.post(URLS.DASHBOARD, payload);
    if (response?.code === 200) {
      dispatch(
        fetchDashboardData(
          response?.dataObject?.data?.length ? response.dataObject.data : []
        )
      );

      navigate("/dashboard");
      window.location.reload()
    }
  };

  const onClickLogout = async () => {
    const payload = {
      userId: userData?.userId,
      sessionId: userData?.sessionId,
       logoutDevice: "Web"
    };
    const response = await apiClient.post(URLS.LOGOUT, payload);
    if(response.code === 200) {
      localStorage.clear()
      navigate("/")
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    let cartPrice = 0;
    cart?.length &&
      cart.forEach((item) => {
        cartPrice += item?.prodMarketPrice || item?.price * item?.cartQty;
      });
    setTotalCartPrice(cartPrice);
    dispatch(handleCartCountChange(cart?.length))
  }, [cart]);


  const handleCartClick = async () => {
    setCartDrawer((prev) => !prev);
    const response = await apiClient.post(URLS.CART, {   userId: userData.userId})
    // if(response.code === 200) {
      dispatch(setCartData(response?.cartProducts ?? []))
    // }
  };

  const handleCartClose = () => {
    setCartDrawer(false);
  };

  const onclickLogo = () => {
    getDashboardData()
  };

  return (
    <>
      <div className="dashboard-header-root">
        <Button onClick={() => onclickLogo()} className="logo">
          <h4>OSC</h4>
        </Button>
        <div className="search-input-container">
          <input
            placeholder="Search for products, brands and more"
            className="search-input"
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="user-root">
          <PersonIcon className="icon" />
          <h4>{firstName}</h4>
          <Button onClick={handleClick}>
            <ArrowDropDownIcon className="icon" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Orders</MenuItem>
            <MenuItem onClick={handleClose}>Wishlist</MenuItem>
            <MenuItem onClick={() => onClickLogout()}>Logout</MenuItem>
          </Menu>
          <IconButton onClick={() => handleCartClick()}>
            <StyledBadge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon htmlColor="#15529C" />
            </StyledBadge>
          </IconButton>
        </div>
        <Drawer
          anchor="right"
          style={{ position: "relative" }}
          open={cartDrawer}
          onClose={() => setCartDrawer(false)}
        >
          <div className="drawer-content">
            <div className="drawer-header">
              <h4>Shopping Cart</h4>
              <IconButton
                className="close-icon"
                onClick={() => handleCartClose()}
              >
                <CloseIcon htmlColor="#fff" />
              </IconButton>
            </div>
            <div className="drawer-main">
              <div className="cart-items-container">
                {cart?.length
                  ? cart.map((item, index) => (
                      <CartItem cartData={item} key={`cart-item-${index}`} />
                    ))
                  : null}
              </div>
            </div>
            <div className="drawer-footer">
              <CartPrice
                totalCartPrice={totalCartPrice}
                increasedValue={increasedValue}
                cart={cart}
              />
              <div className="place-order-root">
                <p>
                  Your Saving on this order ₹
                  {parseInt(increasedValue - totalCartPrice)}
                </p>
                <CustomButton>Place Order</CustomButton>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <Status className={"status"} />
    </>
  );
};

export default DashboardHeader;
