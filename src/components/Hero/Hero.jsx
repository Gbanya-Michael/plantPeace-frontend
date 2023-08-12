import React, { useEffect, useState } from "react";
import "./Hero.scss";
import axios from "axios";

import LeftGarden from "../../assets/plantLeft.svg";
import RightArrow from "../../assets/arrowDark.svg";
import HeroImg from "../../assets/Hero.png";

export default function Hero() {
  const [hero, setHero] = useState({});
  const getHeroData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/hero");

      const { subTitle, title, statement, shopNow, learnGardening } =
        response?.data?.data?.attributes;

      setHero({ subTitle, title, statement, shopNow, learnGardening });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getHeroData();
  }, []);

  return (
    <section className="hero">
      <main className="hero__main">
        <h3>{hero?.subTitle}</h3>

        <div className="hero__main--leftInfo">
          <h2>{hero?.title}</h2>
          <p>{hero?.statement}</p>
        </div>

        <button>{hero?.shopNow}</button>

        <div className="hero__main--gardening">
          <img src={LeftGarden} className="mainImage" />
          <ul>
            <li>{hero?.learnGardening}</li>
            <li>
              <img src={RightArrow} />
            </li>
          </ul>
        </div>
      </main>

      <img src={HeroImg} className="hero__image" />
    </section>
  );
}
