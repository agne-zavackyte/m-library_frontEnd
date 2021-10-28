import React, { useState } from "react";
import { InputField } from "..";
import * as S from "./FormTemplate.style";
import { arrayOf, bool, func, objectOf, string } from "prop-types";

const FormTemplate = ({ btnName, callback, fields, primary, type }) => {
 const [fieldValues, setFieldValues] = useState({});

 return (
  <form
   onSubmit={(e) => {
    e.preventDefault();
    callback({ username: "Hermione Granger", password: "alohomora" });
   }}
  >
   {fields &&
    fields.map((field, index) => (
     <S.InputWrapper key={index}>
      <InputField
       type={field.type}
       placeholder={field.placeholder}
       icon={field.icon}
       handleChange={(e) =>
        setFieldValues({
         ...fieldValues,
         [field.name]: e.target.value,
        })
       }
      />
     </S.InputWrapper>
    ))}
   <S.StyledButton type={type} primary={primary}>
    {btnName}
   </S.StyledButton>
  </form>
 );
};

FormTemplate.propTypes = {
 callback: func,
 primary: bool,
 fields: arrayOf(objectOf(string)),
 btnName: string,
 type: string,
};

export default FormTemplate;
