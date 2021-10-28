import styled from "styled-components";
import { Link } from "react-router-dom";
import { burgerMenu, logOutIcon } from "../../assets";

export const Header = styled.header`
 max-width: ${(props) => props.theme.mainStyle.width};
 margin: 0 auto;
 padding: 20px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
 z-index: 2;
 box-sizing: border-box;
`;

export const Logo = styled.img`
 width: 50px;
`;

export const StyledLink = styled(Link)`
 text-decoration: none;
 font-weight: 200;
 line-height: 1.5;
 color: ${(props) => props.theme.mainStyle.text};
 transition: 0.1s;

 &:not(:last-child) {
  margin-right: 20px;
 }

 &:hover {
  transform: scale(1.07);
 }

 @media (max-width: 650px) {
  &:not(:last-child) {
   margin: 0;
   margin-bottom: 40px;
  }
 }
`;

export const Actions = styled.nav`
 display: flex;
 align-self: center;

 @media (max-width: 650px) {
  display: none;
 }
`;

export const Logout = styled.button`
 width: 20px;
 height: 20px;
 border: none;
 background: url(${logOutIcon}) no-repeat center;
 background-size: cover;
 transition: 0.1s;
 cursor: pointer;

 &:hover {
  transform: scale(1.07);
 }
`;

export const BurgerMenu = styled.button`
 display: none;

 @media (max-width: 650px) {
  display: ${(props) => (props.open ? "none" : "block")};
  width: 30px;
  height: 30px;
  border: none;
  background: url(${burgerMenu}) no-repeat center;
  background-size: cover;
  cursor: pointer;
 }
`;

export const Burger = styled.div`
 display: none;

 @media (max-width: 650px) {
  display: block;
 }
`;
