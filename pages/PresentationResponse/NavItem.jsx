import React from "react";
import { styles } from "./styles";

const NavItem = ({ number, text}) => {

  console.log(text);
  return (
    <div
      style={{
        ...styles.navItem.container,
        ...styles.navItem.active,
      }}
    >
      <span style={styles.navItem.number}>{number}</span>
      <span style={styles.navItem.text}>{text}</span>
    </div>
  );
};

export default NavItem;
