import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: "140px", clear: "both", paddingTop: 25, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
