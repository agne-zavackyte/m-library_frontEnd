import styled from "styled-components";

export const Button = styled.button`
 width: ${(props) => (props.customWidth ? props.customWidth : "100%")};
 height: 42px;
 padding: ${(props) => (props.icon ? "none" : "10px 20px")};
 color: ${(props) => props.theme.mainStyle.text};
 border: none;
 border-radius: ${(props) => (props.doubleButton ? "4px 0 0 4px" : "4px")};
 background: ${(props) => props.icon && `url(${props.icon}) no-repeat center`};
 background-color: ${(props) =>
  props.primary && !props.disabled
   ? props.theme.mainStyle.primary
   : props.theme.mainStyle.disabled};
 background-size: ${(props) => props.icon && "20px"};
 box-shadow: ${(props) =>
  props.disabled ? `inset 0 42px ${props.theme.mainStyle.disabledOp}` : "none"};
 cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
 transition: 0.3s;
 box-sizing: border-box;

 &:nth-child(2n) {
  border-radius: ${(props) => props.doubleButton && "0 4px 4px 0"};
 }

 &:hover {
  background-color: ${(props) =>
   !props.disabled && props.theme.mainStyle.primary};
 }
`;
