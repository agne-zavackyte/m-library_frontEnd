import styled from "styled-components";

export const PageNumbers = styled.nav`
 display: flex;
 justify-content: center;
 flex-wrap: wrap;
 margin-top: 20px;
`;

export const PageButton = styled.button`
 min-width: 30px;
 height: auto;
 margin-bottom: 5px;

 &:not(:first-child) {
  margin-left: 5px;
 }

 padding: 10px 5px;
 font-weight: 200;
 color: ${(props) => props.theme.mainStyle.text};
 font-weight: 200;
 border: 1px solid ${(props) => props.theme.mainStyle.textOp3};
 border-radius: 4px;
 cursor: pointer;
 background-color: ${(props) =>
  props.selected
   ? props.theme.mainStyle.primary
   : props.theme.mainStyle.bodyCol};
`;
