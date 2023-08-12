import React, { useState, useEffect } from "react";
import "./Popular.scss";
import axios from "axios";
// import Cactus from "../../assets/cactus.jpg";

export default function Popular() {
  const [popularTitle, setPopularTitle] = useState({});
  const [popularPriceCards, setPopularPriceCards] = useState([]); // <-- Change the initial state to an empty array

  const getPopularData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/popular", {
        params: {
          "populate[popularTitle]": true,
          "populate[popularPriceCards][populate][image]": true,
        },
      });

      const { popularTitle, popularPriceCards } =
        response?.data?.data?.attributes;

      // console.log("API responese:", response.data);

      setPopularTitle(popularTitle);
      setPopularPriceCards(popularPriceCards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPopularData(); //CALLS THE FUNCTION
  }, []);

  return (
    <main className="popular">
      <h1>
        {popularTitle?.title} <span>{popularTitle?.subTitle}</span>
      </h1>

      <section className="popular__cardsSection">
        {popularPriceCards.map((card) => (
          <div key={card.id} className="card">
            <img
              src={`http://localhost:1337${card?.image?.data?.attributes?.url}`}
            />

            <div>
              <h3>{card?.title}</h3>
              <ul>
                <li>${card?.currentPrice}</li>
                <li>${card?.previousPrice}</li>
              </ul>
              <button>{card?.label}</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
