import React, { useState } from "react";
import * as S from "./Notification.style";
import { string } from "prop-types";

const Notification = ({ children }) => {
 const [display, setDisplay] = useState(true);

 return (
  <S.Notification isDisplayed={display}>
   <S.Message>{children}</S.Message>
   <S.CloseButton onClick={() => setDisplay(false)} />
  </S.Notification>
 );
};

Notification.propTypes = {
 children: string,
};

export default Notification;
