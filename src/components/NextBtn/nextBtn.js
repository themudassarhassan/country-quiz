import React from "react";

import "./nextBtn.css";
export const NextBtn = (props) => {
  return (
    <div className="next" onClick={props.onClick}>
      <a className="next-btn">Next</a>
    </div>
  );
};
