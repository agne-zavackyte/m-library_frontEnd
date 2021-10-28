import styled from "styled-components";
import { Link } from "react-router-dom";
import { infoIcon, defaultImg } from "../../assets/";

export const Poster = styled.div`
 width: 171px;
 height: 250px;
 border: 1px solid ${(props) => props.theme.mainStyle.textOp3};
 border-radius: 4px;
 background: ${(props) =>
  props.src !== "" || null
   ? `url(${props.src}) no-repeat center`
   : `url(${defaultImg}) no-repeat center`};
 background-size: cover;
 box-shadow: ${(props) =>
  props.isDisabled && `inset 0 250px ${props.theme.mainStyle.textOp5}`};
 cursor: ${(props) => props.isDisabled && "no-drop"};

 &:hover {
  transform: ${(props) => props.isActive && "scale(1.05)"};
  box-shadow: ${(props) =>
   props.isActive && "inset 0 250px rgba(0, 0, 0, 0.9)"};
  border: ${(props) =>
   props.isActive
    ? `1px solid ${props.theme.mainStyle.textOp8}`
    : `1px solid ${props.theme.mainStyle.textOp3}`};
 }

 @media (max-width: 413px) {
  width: 121px;
  height: 200px;
 }
`;

export const IconContainer = styled.div`
 display: ${(props) => (props.isActive ? "flex" : "none")};
 width: 100%;
 height: 100%;
 justify-content: center;
 align-items: center;
`;

export const StyledLink = styled(Link)`
 width: 40px;
 height: 40px;
 background: url(${infoIcon});
 background-size: cover;
 border: none;
 cursor: pointer;
 transition: 0.2s;

 &:hover {
  transform: scale(1.07);
 }
`;

export const NoImageTitle = styled.h4`
 text-align: center;
 font-weight: 200;
`;

export const Details = styled.h4`
 max-width: 178px;
 margin: 5px 0;
 font-weight: 200;
 opacity: 0.6;
`;

export const Title = styled.h4`
 max-width: 171px;
 margin: 0;
 margin-bottom: 10px;
 font-weight: 500;

 @media (max-width: 413px) {
  max-width: 121px;
 }
`;
