import React from "react";
import "./ProductList.css";
import CustomButton from "../CustomButton";
import ProductCard from "../ProductCard";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import { useDispatch } from "react-redux";
import {
  setProductDetails, setCategories
} from "../../redux/dashboardSlice";
import { URLS } from "../../constants";

const ProductList = (props) => {
  const { categoryTitle, productData, categoryId} = props;
  const userData = JSON.parse(localStorage.getItem("userData"))
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onClickProduct = async (prodId, catId) => {

    if (prodId) {
      const response = await apiClient.post(URLS.PRODUCT_DETAILS, {
        userId: userData.userId,
        catId: catId || categoryId,
        prodId: prodId,
      });
      console.log("response::>",prodId)
      if (response?.code === 200) {
        dispatch(setProductDetails(response.dataObject));
        navigate(`/product/${prodId}?catId=${catId}`);
      }
    } else {
      console.log("response:::",userData)
      const response = await apiClient.post(URLS.PRODUCT_FILTER, {
        userId: userData.userId,
        catId: catId,
        filter: "P",
      });
      if (response?.code === 200) {
        dispatch(setCategories(response?.dataObject?.products));
        navigate(`/category/${catId}`);
      }
    }
  };
console.log({productData})
  return (
    <div className="product-list-root">
      {categoryTitle ? (
        <div className="product-list-header">
          <h4>{categoryTitle}</h4>
          {productData.length > 6 ? (
            <CustomButton>View All</CustomButton>
          ) : null}
        </div>
      ) : null}
      <Grid container spacing={3} className="product-list">
        {productData?.length
          ? productData.map((item, index) => (
              <Grid className="product-list-item" item md={2}>
                <ProductCard
                  key={`featured-product-${index}`}
                  onClickProduct={onClickProduct}
                  price={item?.prodMarketPrice || item?.productprice}
                  percentOff={item?.prodMarketPrice && "%7 off"}
                  title={item?.prodName || item?.categoryname || item?.productname}
                  productId={item?.productid}
                  categoryId={item?.categoryid}
                  image={
                    item?.productid || item?.categoryid
                      ? require(`../../assets/images/${
                          item?.productid || item?.categoryid
                        }.jpg`)
                      : null
                  }
                />
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
};

export default ProductList;
