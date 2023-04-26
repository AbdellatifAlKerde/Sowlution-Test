import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Spinner from "../../components/spinner";
import ProductPopUp from "../../components/ProductPopUp";
import GlobalButton from "../../components/GlobalButton";

function Products() {
  // Create a state to store the data response from the database
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [eachData, setEachData] = useState([]);

  // Fetching data from the database using Axios
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.manoapp.com/api/v1/users/products/whats_new",
        {
          // Put the headers so we can get the data
          headers: {
            StoreID: 4,
            Authorization: "f44a4aabfc5992514d262d7f517327e7",
            UserAddressID: 60877,
          },
        }
      );
      // Set the data to the data state the we inititate first
      setData(response.data.data.items);
      setIsLoading(false);
    } catch (error) {
      // Catching server errors
      console.log(error);
    }
  };

  const getProductByID = async (id) => {
    try {
      const response = await axios.get(
        `https://api.manoapp.com/api/v1/users/products/${id}`,
        {
          // Put the headers so we can get the data
          headers: {
            StoreID: 4,
            Authorization: "f44a4aabfc5992514d262d7f517327e7",
            UserAddressID: 60877,
          },
        }
      );
      setEachData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // use useEffect to fetch the data when we load the page
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Show the spinner loader when there is no data displayed yet */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="products">
          <div className="hero-section">
            <h1>Products</h1>
          </div>
          <div className="cards">
            {/* Mapping into product */}
            {data.map((product) => {
              return (
                <div
                  className="card"
                  onClick={async () => {
                    await getProductByID(product.id);
                    setShowCard(true);
                  }}
                >
                  <div className="image">
                    <img
                      src={product.images[0].original}
                      alt={product.images[0].original}
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="description">
                    <p>{product.price}$</p>
                    <h2>{product.title}</h2>
                  </div>
                  <div className="order">
                    <GlobalButton label="Order Now" />
                  </div>
                </div>
              );
            })}
            {/* Show the pop up when the state is true */}
            {showCard && (
              <ProductPopUp
                title={eachData.title}
                src={eachData.images[0].large.toString()}
                alt={eachData.images[0].large}
                price={eachData.price}
                onClick={() => setShowCard(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
