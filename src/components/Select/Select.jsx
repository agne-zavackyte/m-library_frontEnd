import React from "react";
import * as S from "./Select.style";
import { arrayOf, bool, func, string } from "prop-types";

const Select = ({ disabled, handleChange, options }) => {
 return (
  <S.Select onChange={handleChange} disabled={disabled}>
   <option value="all">All</option>
   {options.map((option, index) => (
    <option key={index} value={option}>
     {option}
    </option>
   ))}
  </S.Select>
 );
};

Select.propTypes = {
 disabled: bool,
 handleChange: func,
 options: arrayOf(string),
};

export default Select;
