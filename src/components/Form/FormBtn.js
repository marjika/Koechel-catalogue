import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, color: "black" }} className="btn btn-default">
    {props.children}
  </button>
);
