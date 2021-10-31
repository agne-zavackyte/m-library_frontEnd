import React, { useState } from "react";
import * as S from "./Header.style";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { BurgerMenu } from "../";
import { func, string } from "prop-types";

const Header = ({ loggedIn, logOut }) => {
 const [openNav, setOpen] = useState(false);
 const navMenu = [
  {
   id: 1,
   to: "/",
   pageName: "HOME",
  },
  {
   id: 2,
   to: "/library/collection",
   pageName: "LIBRARY",
  },
  {
   id: 3,
   to: "/search",
   pageName: "EXPLORE",
  },
 ];

 return (
  <S.Header>
   {!loggedIn && (
    <Link to="/login">
     <S.Logo src={logo} alt="Logo" />
    </Link>
   )}
   {loggedIn && (
    <>
     <Link to="/">
      <S.Logo src={logo} alt="Logo" />
     </Link>
     <S.Actions>
      {navMenu.map((page) => (
       <S.StyledLink key={page.id} to={page.to}>
        {page.pageName}
       </S.StyledLink>
      ))}
      <S.Logout onClick={logOut} />
     </S.Actions>
     <S.Burger>
      <S.BurgerMenu openNav={openNav} onClick={() => setOpen(!openNav)} />
      <BurgerMenu openNav={openNav} handleClick={() => setOpen(!openNav)}>
       {navMenu.map((page) => (
        <S.StyledLink
         key={page.id}
         to={page.to}
         onClick={() => setOpen(!openNav)}
        >
         {page.pageName}
        </S.StyledLink>
       ))}
       <S.StyledLink
        to="/login"
        onClick={() => {
         logOut();
         setOpen(!openNav);
        }}
       >
        LOG OUT
       </S.StyledLink>
      </BurgerMenu>
     </S.Burger>
    </>
   )}
  </S.Header>
 );
};

Header.propTypes = {
 loggedIn: string.isRequired,
 logOut: func.isRequired,
};

export default Header;
