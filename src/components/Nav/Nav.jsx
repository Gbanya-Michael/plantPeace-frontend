import React, { useEffect, useState } from "react";
import "./Nav.scss";

import { Link } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  //STATE VARIABLES
  const [logo, setLogo] = useState({});
  const [links, setLinks] = useState([]);
  const [icon, setIcon] = useState([]);

  const getNavData = async () => {
    try {
      //USING AXIOS TO GET NAV DATA FROM BACKEND
      const response = await axios.get("http://localhost:1337/api/nav", {
        params: {
          "populate[logo][populate][image]": true,
          "populate[links]": true,
          "populate[icon][populate][image]": true,
        },
      });

      //DESTRUCTURING THE DATA
      const { logo, links, icon } = response?.data?.data?.attributes;

      setLogo(logo);
      setLinks(links);
      setIcon(icon);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNavData(); //CALLS THE FUNCTION
  }, []); //EMPTY ARRAY MEANS IT WILL ONLY RUN

  return (
    <nav className="nav">
      <Link to={"/"} className="nav__logo">
        <img
          src={`http://localhost:1337${logo?.image?.data?.attributes?.url}`}
        />

        <h4>{logo?.name}</h4>
      </Link>

      <ul className="nav__middleBlock">
        {links?.map((link) => (
          <li key={link.id}>
            <Link to={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <div className="nav__lastBlock">
        {icon.map((icons) => (
          <Link key={icons.id} to={icons?.url}>
            <img
              src={`http://localhost:1337${icons?.image?.data?.attributes?.url}`}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
