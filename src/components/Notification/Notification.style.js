import styled from "styled-components";
import { closeIcon } from "../../assets";

export const Notification = styled.div`
 display: ${(props) => (props.isDisplayed ? "flex" : "none")};
 justify-content: space-between;
 max-width: 100%;
 height: auto;
 padding: 20px;
 margin-bottom: 20px;
 border-radius: 4px;
 border: 1px solid ${(props) => props.theme.mainStyle.textOp5};
 background: ${(props) => props.theme.mainStyle.primaryOp};
 box-sizing: border-box;
`;

export const Message = styled.span`
 padding-right: 5px;
 color: ${(props) => props.theme.mainStyle.text};
 text-transform: uppercase;
`;

export const CloseButton = styled.button`
 width: 25px;
 height: 25px;
 margin: -12px -12px 0 0;
 background: url(${closeIcon}) no-repeat center;
 background-size: 10px;
 border: none;
 color: ${(props) => props.theme.mainStyle.text};
 cursor: pointer;
 transition: 0.1s;

 &:hover {
  transform: scale(1.1);
 }
`;
