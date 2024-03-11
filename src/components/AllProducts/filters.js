import React, { useEffect, useState, useRef } from "react";
import RadioButton from "../../app/RadioButton";
import { sortingArray } from "../../data";
import Checkbox from "../../app/Checkbox";
import { useDispatch } from "react-redux";
import { setIsOverlay } from "../../action";

export default function Filters({
  productsArray,
  filterValues,
  setFilterValues,
  productList,
  setProductList,
  productsInOnePage,
  setPage,
  setTotalPages,
  setShowFilterPopup,
  showFilterPopup,
}) {
  const [filters, setFilters] = useState({});
  const [sortingValue, setSortingValue] = useState("Sort By values");
  const filterFlagRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showFilterPopup) {
      document.body.style.overflow = "hidden";
      dispatch(setIsOverlay(true));
    } else {
      document.body.style.overflow = "auto";
      dispatch(setIsOverlay(false));
    }
  }, [showFilterPopup]);

  useEffect(() => {
    if (filterFlagRef.current) {
      handleFilters();
    }
  }, [filterValues]);

  useEffect(() => {
    const category = [];
    const brandArr = [];
    const colorsArr = [];
    const sizeArr = [];
    let minPrice = 0;
    let maxPrice = 0;
    productsArray.forEach((product) => {
      if (!brandArr.includes(product.vendor)) brandArr.push(product.vendor);
      if (!category.includes(product.product_type))
        category.push(product.product_type);

      product.variants.forEach((variant) => {
        if (product.variants.length > 1) {
          if (!colorsArr.includes(variant.option1))
            colorsArr.push(variant.option1);
          if (!sizeArr.includes(variant.option2)) sizeArr.push(variant.option2);
        }
      });

      if (+product.variants[0].price < +minPrice) {
        minPrice = +product.variants[0].price;
      }

      if (+product.variants[0].price > +maxPrice) {
        maxPrice = product.variants[0].price;
      }
    });

    setFilterValues({
      category: [],
      brandArr: [],
      colorsArr: [],
      sizeArr: [],
      maxPrice,
    });

    let obj = {
      category,
      brandArr,
      colorsArr,
      sizeArr,
      minPrice,
      maxPrice,
    };
    setFilters(obj);
  }, [productsArray]);

  const handleFilterChange = (filterType, value) => {
    filterFlagRef.current = true;
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const handleSorting = (products, sortingValue) => {
    let arr = [];
    arr = products.sort((a, b) => {
      let valA = "";
      let valB = "";
      switch (sortingValue) {
        case "title":
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;

        case "title-reverse":
          valA = b.title.toLowerCase();
          valB = a.title.toLowerCase();
          break;

        case "price-high-to-low":
          valA = +b.variants[0].price;
          valB = +a.variants[0].price;
          break;

        case "price-low-to-high":
          valA = +a.variants[0].price;
          valB = +b.variants[0].price;
          break;

        case "recently-added":
          valA = new Date(b.updated_at);
          valB = new Date(a.updated_at);
          break;

        default:
          break;
      }

      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    });

    setProductList(arr);
  };

  const handleFilters = () => {
    let arr = [];
    arr = productsArray.filter((product) => {
      let colorFlag = false;
      let sizeFlag = false;
      if (product.variants.length > 1) {
        filterValues.colorsArr.forEach((color) => {
          if (product.options[0].values.includes(color)) {
            colorFlag = true;
          }
        });
        filterValues.sizeArr.forEach((size) => {
          if (product.options[1].values.includes(size)) {
            sizeFlag = true;
          }
        });
      }

      if (
        (filterValues.category.length > 0
          ? filterValues.category.includes(product.product_type)
          : true) &&
        (filterValues.brandArr.length > 0
          ? filterValues.brandArr.includes(product.vendor)
          : true) &&
        +filterValues.maxPrice >= +product.variants[0].price &&
        (filterValues.colorsArr.length > 0 ? colorFlag : !colorFlag) &&
        (filterValues.sizeArr.length > 0 ? sizeFlag : !sizeFlag)
      ) {
        return product;
      }
    });

    const pageCount = Math.ceil(arr.length / productsInOnePage);
    setPage(0);
    setTotalPages(pageCount);
    setProductList(arr);
    if (typeof sortingValue === "object")
      handleSorting(arr, sortingValue.title);
  };

  return (
    <div className="position-relative filter-container py-2">
      <div className="top-wrapper font-18 position-relative font-bold d-flex justify-content-between">
        <span>Filters & Sorting</span>
        <button
          onClick={() => setShowFilterPopup(false)}
          type="button"
          title="close"
          className="close-btn d-none text-orange"
          // style={{ right: 20, top: 20 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 64 64"
          >
            <g>
              <path
                d="M4.59 59.41a2 2 0 0 0 2.83 0L32 34.83l24.59 24.58a2 2 0 0 0 2.83-2.83L34.83 32 59.41 7.41a2 2 0 0 0-2.83-2.83L32 29.17 7.41 4.59a2 2 0 0 0-2.82 2.82L29.17 32 4.59 56.59a2 2 0 0 0 0 2.82z"
                fill="currentColor"
                opacity="1"
              ></path>
            </g>
          </svg>
        </button>

        <div className="position-absolute w-100 line"></div>
      </div>
      <div className="filters-outer-wrapper w-100">
        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Categories
          </label>
          {sortingArray.map((data) => {
            return (
              <div
                className="filter d-flex align-items-center py-1"
                key={data.title}
              >
                <RadioButton
                  label={data.label}
                  labelClass="font-12"
                  onChange={() => {
                    setSortingValue(data);
                    handleSorting(productList, data.title);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Categories
          </label>
          {filters?.category?.map((type) => {
            return (
              <div className="filter d-flex align-items-center py-1" key={type}>
                <Checkbox
                  id={type}
                  name={type}
                  onChange={() => handleFilterChange("category", type)}
                  labelClasses="font-12"
                  label={type}
                />
              </div>
            );
          })}
        </div>

        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Brands
          </label>
          {filters?.brandArr?.map((type) => {
            return (
              <div className="filter d-flex align-items-center py-1" key={type}>
                <Checkbox
                  id={type}
                  name={type}
                  onChange={() => handleFilterChange("brandArr", type)}
                  labelClasses="font-12"
                  label={type}
                />
              </div>
            );
          })}
        </div>
        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Price Range
          </label>
          <div className="d-flex gap-2">
            <span className="font-12">${filters?.minPrice}</span>
            <input
              className="w-100"
              type="range"
              min={filters?.minPrice}
              max={filters?.maxPrice}
              value={filterValues.maxPrice}
              onChange={(e) => {
                filterFlagRef.current = true;
                setFilterValues((prevVal) => ({
                  ...prevVal,
                  maxPrice: e.target.value,
                }));
              }}
            />
            <span className="font-12">${filterValues?.maxPrice}</span>
          </div>
        </div>

        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Sizes
          </label>
          <div className="d-flex flex-wrap gap-2">
            {filters?.sizeArr?.sort()?.map((data) => {
              return (
                <button
                  key={data}
                  className={`color-size-filter font-12 ${
                    filterValues.sizeArr.includes(data)
                      ? "bg-dark text-white"
                      : ""
                  }`}
                  style={{ background: data }}
                  title={data}
                  id={data}
                  name={data}
                  onClick={() => handleFilterChange("sizeArr", data)}
                >
                  {data}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filters-wrapper  py-3">
          <label className="font-14 font-bold text-uppercase text-orange mb-2">
            Colours
          </label>
          <div className="d-flex flex-wrap gap-2">
            {filters?.colorsArr?.map((type) => {
              return (
                <button
                  key={type}
                  className={`color-size-filter rounded-circle position-relative ${
                    filterValues.colorsArr.includes(type)
                      ? "selected-color"
                      : ""
                  }`}
                  style={{ background: type }}
                  title={type}
                  id={type}
                  name={type}
                  onClick={() => handleFilterChange("colorsArr", type)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
