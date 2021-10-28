import React from "react";
import * as S from "./Button.style";
import { bool, string, func } from "prop-types";

const Button = ({
 children,
 disabled,
 double,
 handleClick,
 icon,
 primary,
 type,
 width,
}) => {
 return (
  <S.Button
   type={type}
   onClick={handleClick}
   primary={primary}
   doubleButton={double}
   icon={icon}
   customWidth={width}
   disabled={disabled}
  >
   {children}
  </S.Button>
 );
};

Button.propTypes = {
 children: string,
 disabled: bool,
 double: bool,
 handleClick: func,
 icon: string,
 primary: bool,
 type: string.isRequired,
 width: string,
};

export default Button;
