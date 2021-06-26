import React from "react";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer>
      <p>Amit Dethe</p>
      <p>Copyright {year}</p>
    </footer>
  );
};

export default Footer;
