import React, { useEffect, useState } from "react";
import "./Trending.scss";
import axios from "axios";

// import Cactus from "../../assets/cactus.jpg";
// import DarkArrow from "../../assets/arrowDark.svg";
// import OliveArrow from "../../assets/arrowOlive.svg";

import { Link } from "react-router-dom";

export default function Trending() {
  const [header, setHeader] = useState({});
  const [trendLinks, setTrendLinks] = useState([]);
  const [trendCostCard, setTrendCostCard] = useState([]);
  // const [title, setTitle] = useState({});
  const getTrendingData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/trending", {
        params: {
          "populate[header]": true,
          "populate[trendLinks][populate][arrow]": true,
          "populate[trendCostCard][populate][image]": true,
        },
      });

      const { header, trendLinks, trendCostCard } =
        response?.data?.data?.attributes;
      // console.log("API response", response.data);
      setHeader(header);
      setTrendLinks(trendLinks);
      setTrendCostCard(trendCostCard);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };
  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <main className="trending">
      <h2>
        <span>{header?.topic}</span> {header?.span}
      </h2>
      <nav className="trending__selectBar">
        {trendLinks.map((trendLink) => (
          <Link key={trendLink.id} to="/" className="selected">
            <span>{trendLink?.title}</span>
            <span>
              <img
                src={`http://localhost:1337${trendLink?.arrow?.data?.attributes?.url}`}
              />
            </span>
          </Link>
        ))}
      </nav>

      <section className="trending__cardsSection">
        {trendCostCard.map((trendCard) => (
          <div key={trendCard.id} className="card">
            <img
              src={`http://localhost:1337${trendCard?.image?.data?.attributes?.url}`}
            />
            <div>
              <h3>{trendCard?.title}</h3>
              <ul>
                <li>${trendCard?.currentPrice}</li>
                <li>${trendCard?.previousPrice}</li>
              </ul>
              <button>{trendCard?.label}</button>
            </div>
          </div>
        ))}
        {/* <div className="card">
          <img src={Cactus} />

          <div>
            <h3>Echinocereus Cactus</h3>
            <ul>
              <li>$15.00</li>
              <li>$35.00</li>
            </ul>
            <button>indoor</button>
          </div>
        </div> */}
      </section>
    </main>
  );
}
