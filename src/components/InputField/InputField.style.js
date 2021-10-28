import styled from "styled-components";

export const Input = styled.input`
 width: 100%;
 height: 42px;
 padding: ${(props) => (!props.icon ? "0 20px 0 10px" : "10px 20px 10px 60px")};
 font-weight: 200;
 border: none;
 border-radius: 4px;
 outline: none;
 background: ${(props) => props.icon && `url(${props.icon})`} no-repeat 20px;
 background-color: ${(props) => props.theme.mainStyle.primaryOp};
 background-size: 20px;
 color: ${(props) => props.theme.mainStyle.text};
 box-sizing: border-box;
 position: relative;

 &::placeholder {
  color: ${(props) => props.theme.mainStyle.textOp8};
  font-weight: 200;
  text-transform: capitalize;
  transition: 0.2s;
 }
`;
