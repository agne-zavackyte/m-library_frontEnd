import styled from "styled-components";
import close from "../../assets/close-button.svg";

export const Menu = styled.nav`
 display: ${(props) => (props.openNav ? "block" : "none")};
 width: 80%;
 height: 100vh;
 background-color: rgba(20, 20, 20, 0.95);
 position: absolute;
 top: 0;
 right: 0;
`;

export const MenuList = styled.div`
 width: 100%;
 height: 100%;
 padding: 0;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

export const CloseMenu = styled.button`
 width: 30px;
 height: 30px;
 background: url(${close}) no-repeat center;
 background-size: cover;
 float: right;
 margin: 20px 20px 0 0;
 cursor: pointer;
 outline: none;
 border: none;
 transition: 0.3s;

 &:hover {
  transform: scale(0.9);
 }
`;
