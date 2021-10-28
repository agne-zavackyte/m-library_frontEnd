import React from "react";
import * as S from "./BurgerMenu.style";
import { arrayOf, bool, func, node } from "prop-types";

const BurgerMenu = ({ children, handleClick, openNav }) => {
  return (
    <S.Menu openNav={openNav}>
      <S.CloseMenu onClick={handleClick} />
      <S.MenuList>{children}</S.MenuList>
    </S.Menu>
  );
};

BurgerMenu.propTypes = {
  children: arrayOf(node),
  handleClick: func,
  openNav: bool,
};

export default BurgerMenu;
