import styled from "styled-components";

export const MainHeading = styled.h1`
 max-width: 80%;
 margin: 0;
 margin-bottom: 20px;
 font-weight: 500;
 font-size: 6vw;
 font-family: "Poiret One", cursive;
`;

export const ButtonWrap = styled.div`
 width: 150px;
 margin: 0 auto;
 padding: 20px 0;

 &:nth-child(2n) {
  padding: 40px 0 0 0;
 }
`;

export const AlignContainer = styled.div`
 max-width: ${(props) => props.theme.mainStyle.width};
 margin: 0 auto;
 padding: 0 20px 20px;
 box-sizing: border-box;
`;
