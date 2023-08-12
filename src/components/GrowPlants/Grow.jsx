import React, { useEffect, useState } from "react";
import "./Grow.scss";

import axios from "axios";
// import Water from "../../assets/water.svg";
// import Sun from "../../assets/Sun.svg";
// import Fertliser from "../../assets/Fertiliser.svg";

// import Pic1 from "../../assets/plants.jpg";
// import Square from "../../assets/squarePhoto.jpg";

export default function Grow() {
  const [steps, setSteps] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stepsParentTitle, setStepsParentTitle] = useState({});
  const getGrowData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/step", {
        params: {
          "populate[stepsParentTitle]": true,
          "populate[steps][populate][stepsTitle]": true,
          "populate[steps][populate][image]": true,
          "populate[gallery][populate][images]": true,
          "populate[gallery][populate][photo]": true,
        },
      });
      const { stepsParentTitle, steps, gallery } =
        response?.data?.data?.attributes;

      //check api response

      // console.log("API response:", response.data);

      setStepsParentTitle(stepsParentTitle);
      setSteps(steps);
      setGallery(gallery);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    getGrowData();
  }, []);

  return (
    <main className="grow">
      <div className="grow__header">
        <h1>{stepsParentTitle?.title}</h1>
        <p>{stepsParentTitle?.subTitle}</p>
      </div>
      <section className="grow__adviceCards">
        {steps?.map((step) => (
          <div key={step.id}>
            <ul>
              <li>
                <img
                  src={`http://localhost:1337${step?.image?.data?.attributes?.url}`}
                />
              </li>
              <li>{step?.stepsTitle?.title}</li>
            </ul>
            <p>{step?.stepsTitle?.subTitle}</p>
          </div>
        ))}
        {/* 
        <div>
          <ul>
            <li>
              <img src={Sun} />
            </li>
            <li>Sunlight</li>
          </ul>
          <p>
            Most plants need adequate sunlight to thrive. Place your plants in
            areas that receive the appropriate amount of light for their
            specific needs
          </p>
        </div> */}
      </section>
      <section className="grow__ourWeb">
        {gallery?.map((gal, index) => {
          if (gal.__component === "steps.photos") {
            return (
              <img
                key={index}
                src={`http://localhost:1337${gal.images.data.attributes.url}`}
              />
            );
          }
          if (gal.__component === "steps.image-and-message") {
            return (
              <div key={index}>
                <img
                  src={`http://localhost:1337${gal.photo.data.attributes.url}`}
                />
                <p>{gal.message}</p>
                <button>{gal.button}</button>
              </div>
            );
          } else {
            //Return nothing
            return null;
          }
        })}
      </section>
      ;
    </main>
  );
}
