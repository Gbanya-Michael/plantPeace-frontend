import React, { useEffect, useState } from "react";
import "./Footer.scss";
import axios from "axios";
// import Logo from "../../assets/logo1.svg";

export default function Footer() {
  const [footerLeft, setFooterLeft] = useState({});
  const [links, setLinks] = useState([]);
  const [footerLogo, setFooterLogo] = useState({});

  const getFooterData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/footer", {
        params: {
          "populate[footerLeft]": true,
          "populate[links][populate][link]": true,
          "populate[footerLogo][populate][image]": true,
        },
      });

      const { footerLeft, links, footerLogo } =
        response?.data?.data?.attributes;

      // console.log("API response", response.data);
      setFooterLeft(footerLeft);
      setLinks(links);
      setFooterLogo(footerLogo);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  useEffect(() => {
    getFooterData();
  }, []);

  return (
    <main className="footer">
      <section className="footer__blocks">
        <div className="Lblock">
          <h1>{footerLeft?.title}</h1>
          <ul>
            <li>{footerLeft?.email}</li>
            <li>{footerLeft?.phone}</li>
          </ul>
        </div>

        <div className="Rblock">
          {links.map((linked) => (
            <ul key={linked.id}>
              <h2>{linked?.title}</h2>
              {linked.link.map((accounts) => (
                <li key={accounts.id}>{accounts?.header}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <div className="footer__bottomLine">
        <img
          src={`http://localhost:1337${footerLogo?.image?.data?.attributes?.url}`}
        />
        <p>{footerLogo?.name}</p>
      </div>
    </main>
  );
}
