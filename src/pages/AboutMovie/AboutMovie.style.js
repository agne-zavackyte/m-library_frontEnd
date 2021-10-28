import styled from "styled-components";
import { Container } from "../../components/Section/Section.style";

export const FlexContainer = styled.div`
 display: flex;
 margin-top: 20px;

 @media (max-width: 600px) {
  flex-wrap: wrap;
 }
`;

export const PosterBlock = styled.div`
 @media (max-width: 600px) {
  display: none;
 }
`;

export const ButtonBlock = styled.div`
 @media (max-width: 600px) {
  display: flex;
 }
`;

export const ButtonWrap = styled.div`
 display: ${(props) => (props.isDisplayed ? "block" : "none")};
 margin-top: 10px;

 &:nth-child(1) {
  margin-top: 20px;
 }

 @media (max-width: 600px) {
  margin: 0 10px 20px 0;

  &:nth-child(1) {
   margin-top: 0;
  }
 }
`;

export const DetailsContainer = styled.div`
 width: 100%;
 margin-left: 20px;

 @media (max-width: 600px) {
  margin-left: 0;
 }
`;

export const InfoContainer = styled.p`
 margin-top: 0;
 margin-bottom: 20px;
`;

export const VideoWrap = styled.div`
 margin: 20px 0;
`;

export const Oscar = styled.img`
 width: 6vw;
`;

export const ReviewsContainer = styled.div`
 padding-top: 20px;
`;

export const StyledSection = styled(Container)`
 padding-bottom: 0;
`;
