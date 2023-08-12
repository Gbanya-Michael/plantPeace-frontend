import React, { useEffect, useState } from "react";
import "./Garden.scss";
import axios from "axios";

// import TallPlant from "../../assets/tallPlant.jpg";

export default function Garden() {
  const [gardenTitle, setGardenTitle] = useState({});
  const [gardenCards, setGardenCards] = useState([]);
  const [newsLetter, setNewsLetter] = useState({});
  const getGardenData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/summer-garden",
        {
          params: {
            "populate[gardenTitle]": true,
            "populate[gardenCards][populate][image]": true,
            "populate[newsLetter]": true,
          },
        }
      );
      const { gardenTitle, gardenCards, newsLetter } =
        response?.data?.data?.attributes;
      // console.log("API response", response.data);
      setGardenTitle(gardenTitle);
      setGardenCards(gardenCards);
      setNewsLetter(newsLetter);
    } catch (error) {
      console.error("error fetching data:", errror);
    }
  };

  useEffect(() => {
    getGardenData();
  }, []);

  const [email, setEmail] = useState("");
  const handleSubscribe = async (e) => {
    e.preventDefault();
    // console.log("sub", handleSubscribe);
    try {
      // Send email to the Strapi API  subscribers
      await axios.post("http://localhost:1337/api/subscribe", {
        data: { email: email },
      });

      // Clears the input field after successful subscription
      setEmail("");

      alert("Awesome, the plants say hello");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Oops! Error! Please try again later");
    }
  };
  return (
    <main className="garden">
      <div className="garden__header">
        <h1>{gardenTitle?.title}</h1>
        <h3>{gardenTitle?.subTitle}</h3>
      </div>

      <section className="garden__cardSection">
        {gardenCards.map((gardenCard) => (
          <ul key={gardenCard.id}>
            <li>
              <img
                src={`http://localhost:1337${gardenCard?.image?.data?.attributes?.url}`}
              />
            </li>
            <li className="header">{gardenCard?.title}</li>
            <li className="price">${gardenCard?.price}</li>
          </ul>
        ))}

        {/* <ul>
          <li>
            <img src={TallPlant} />
          </li>
          <li className="header">Solar Illuminated Planter Granite</li>
          <li className="price">$139.99</li>
        </ul> */}
      </section>

      <section className="garden__subscribe">
        <div className="GreenCard">
          <ul className="GreenCard__header">
            <h1>{newsLetter?.title}</h1>
            <li>{newsLetter?.instruction}</li>
          </ul>

          <form className="GreenCard__enlist" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">{newsLetter?.subscribe}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
