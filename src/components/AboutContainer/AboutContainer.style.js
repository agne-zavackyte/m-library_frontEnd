import styled from "styled-components";
import { Button } from "../Button/Button.style";
import { defaultImg } from "../../assets";
import { Section } from "../../components/Section/Section.style";
import { HeadingH2 } from "../../components/Heading/Heading.style";

export const StyledSection = styled(Section)`
 margin-top: -20px auto;
 padding: 40px 0;
 display: flex;
 justify-content: center;

 background: linear-gradient(
   to bottom,
   rgba(20, 20, 20, 1),
   rgba(20, 20, 20, 0.5),
   rgba(20, 20, 20, 1)
  ),
  ${(props) =>
   props.src
    ? `url(${props.src}) no-repeat top`
    : `url(${defaultImg}) no-repeat top`};
 background-size: cover;
 box-sizing: border-box;
`;

export const Container = styled.div`
 width: ${(props) => props.theme.mainStyle.width};
 padding: 0 20px;
 box-sizing: border-box;
`;

export const StyledButton = styled(Button)`
 cursor: ${(props) => props.disabled && "not-allowed"};
 :not(:last-child) {
  margin-right: 10px;
 }

 @media (max-width: 485px) {
  height: auto;
 }
`;

export const Form = styled.form`
 display: flex;
 justify-content: center;
 margin-top: 20px;
`;

export const StyledHeading = styled(HeadingH2)`
 margin-top: 0;
`;
