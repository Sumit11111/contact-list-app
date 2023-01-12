import React from "react";
const navbar = () => {
  return (
    <div style={styles.nav}>
      <div id="heading">
        <h1>Contact List App</h1>
      </div>
    </div>
  );
};
export default navbar;

const styles = {
  nav: {
    display: "flex",
    backgroundColor: "gainsboro",
    height: "80px",
  },
};
