import React from "react";
import { heading } from "./type.module.css";

export const Heading = ({ children }) => (
  <h1 className={heading}>{children}</h1>
);
