import React from "react";
import * as S from "./Heading.style";
import { any, bool, string } from "prop-types";

const Heading = ({ children, hTitle, marginTopBig, size }) => {
 return (
  <>
   {size === "big" ? (
    <S.HeadingBig>
     {children}
     {hTitle}
    </S.HeadingBig>
   ) : (
    <S.HeadingH2 marginT={marginTopBig}>{hTitle}</S.HeadingH2>
   )}
  </>
 );
};

Heading.propTypes = {
 children: any,
 hTitle: string,
 marginTopBig: bool,
 size: string,
};

export default Heading;
