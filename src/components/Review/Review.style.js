import styled from "styled-components";

export const ReviewBlock = styled.div`
 padding: 20px;
 border: 1px solid ${(props) => props.theme.mainStyle.textOp3};
 border-radius: 4px;

 :not(:last-child) {
  margin-bottom: 10px;
 }
`;

export const FlexSB = styled.div`
 display: flex;
 justify-content: space-between;
`;

export const Username = styled.h4`
 margin: 0 0 20px 0;
 color: ${(props) => props.theme.mainStyle.primary};
 font-weight: 500;
`;

export const DateAdded = styled.span`
 margin: 0;
 font-weight: 200;
 opacity: 0.5;
`;

export const Review = styled.p`
 margin: 0;
 font-weight: 200;
 opacity: 0.8;
`;
