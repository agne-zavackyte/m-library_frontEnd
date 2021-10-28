import React from "react";
import * as S from "./InputField.style";
import { func, string } from "prop-types";

const InputField = ({ handleChange, icon, placeholder, type }) => {
 return (
  <S.Input
   onChange={handleChange}
   icon={icon}
   placeholder={placeholder}
   type={type}
  />
 );
};

InputField.propTypes = {
 handleChange: func,
 icon: string,
 placeholder: string.isRequired,
 type: string.isRequired,
};

export default InputField;
