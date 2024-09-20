import React from "react";
import "./category.css";
import { Chip } from "@mui/material";
import ProductList from "../../components/ProductList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from "../../api/apiClient";
import { URLS } from "../../constants";
import { setCategories } from "../../redux/dashboardSlice";

const Category = () => {
  const sortOptions = [
    { label: "Popularity", filter: "P" },
    { label: "Price - Low to High", filter: "LH" },
    { label: "Price - High to Low", filter: "HL" },
    { label: "Newest First", filter: "NF" },
  ];

  const dispatch  = useDispatch()

  const [selectedOption, setSelectedOption] = useState("P");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const params = useParams();

  const setSelectedSortOption = (option) => {
    setSelectedOption(option);
  };

  const handleSortApi = async (key) => {
    const response = await apiClient.post(URLS.PRODUCT_FILTER, {
      userId: userData.userId,
      catId: params.catId,
      filter: key
    })
    if(response.code === 200) {
      dispatch(setCategories(response?.dataObject?.products))
    }
  }

  const onClickSort = (filterType) => {
    switch (filterType) {
      case "P": {
        setSelectedSortOption("P");
        handleSortApi(filterType)
        break;
      }
      case "LH": {
        setSelectedSortOption("LH");
        handleSortApi(filterType)
        break;
      }
      case "HL": {
        setSelectedSortOption("HL");
        handleSortApi(filterType)
        break;
      }
      case "NF": {
        setSelectedSortOption("NF");
        handleSortApi(filterType)
        break;
      }
      default: {
        setSelectedSortOption("P");
        handleSortApi(filterType)
        break;
      }
    }
  };

  useEffect(() => {
    setSelectedSortOption("P")
  }, []);

  const { productCategories } = useSelector((state) => state.dashboardSlice);
  return (
    <div className="category-root">
      <div className="sort-container">
        <h4>Category: <span>Camera</span></h4>
        <div>
          <div className="sort-options">
            <h4>Sort:</h4>
            {sortOptions.map((item, index) => (
              <Chip
                className={selectedOption === item.filter ? "selected" : ""}
                key={`sort-item-${index}`}
                label={item.label}
                variant="outlined"
                onClick={() => onClickSort(item.filter)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <ProductList productData={productCategories} categoryId={params.catId}/>
      </div>
    </div>
  );
};

export default Category;
