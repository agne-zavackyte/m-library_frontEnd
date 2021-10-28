import styled from "styled-components";

export const Footer = styled.footer`
 padding: 20px 0;
 border-top: 1px solid ${(props) => props.theme.mainStyle.textOp5};
 box-sizing: border-box;
`;

export const Link = styled.a`
 :not(:last-child) {
  margin-right: 10px;
 }
`;
