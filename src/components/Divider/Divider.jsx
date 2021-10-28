import React from "react";
import * as S from "./Divider.style";
import { string } from "prop-types";

const Divider = ({ width }) => {
  return <S.Divider customWidth={width} />;
};

Divider.propTypes = {
  width: string,
};

export default Divider;
