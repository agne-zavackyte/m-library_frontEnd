import styled from "styled-components";
import { filterIcon } from "../../assets/index";

export const Select = styled.select`
 width: auto;
 height: 42px;
 color: ${(props) => props.theme.mainStyle.text};
 padding: 10px 10px 10px 40px;
 background: url(${filterIcon}) no-repeat 10px center;
 background-color: ${(props) =>
  !props.disabled
   ? props.theme.mainStyle.primary
   : props.theme.mainStyle.disabled};
 background-size: 20px;
 border: none;
 border-radius: 4px;
 cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
 appearance: none;
 outline: none;
 box-sizing: border-box;
`;
