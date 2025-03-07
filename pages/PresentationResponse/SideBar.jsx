import React, { useEffect,useState } from "react";
import NavItem from "./NavItem";
import { styles } from "./styles";

// const navItems = [
//   { number: 1, text: "Can We Really Stop", isActive: true },
//   { number: 2, text: "Understanding the" },
//   { number: 3, text: "The Biggest Culprits" },
//   { number: 4, text: "Renewable Energy .." },
//   { number: 5, text: "Rethinking Consumption.." },
//   { number: 6, text: "Policy and Innovation ans uydewudkjebf..." },
//   { number: 7, text: "Climate Action in vice versa .." },
//   { number: 8, text: "Hope for the Future.." },
// ];

const Sidebar = () => {

  

  const [presentationData, setPresentationData] = useState([]);
  
    useEffect(() => {
      // Get presentation data from sessionStorage
      const storedData = sessionStorage.getItem("presentationData");
      if (storedData) {
        setPresentationData(JSON.parse(storedData));
      }
    }, []);

  
  return (
    <nav style={styles.sidebar.container}>
      <div style={styles.sidebar.navItems}>
        {presentationData.map((slide, index) => (
          <NavItem
            key={index}
            number={index+1}
            text={slide.title}
            
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
