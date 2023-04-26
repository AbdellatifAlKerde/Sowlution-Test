import React from "react";
import "./style.css";

function GlobalButton(props) {
  return <button style={props.style}>{props.label}</button>;
}

export default GlobalButton;
