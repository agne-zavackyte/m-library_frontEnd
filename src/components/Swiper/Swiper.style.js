import styled from "styled-components";
import { HeadingH2 } from "../../components/Heading/Heading.style";
import { defaultImg } from "../../assets";

export const SlideCard = styled.div`
 min-height: 400px;
 margin: 0 20px;
 border: 1px solid ${(props) => props.theme.mainStyle.textOp3};
 border-radius: 4px;
 background: linear-gradient(
   to bottom,
   rgba(20, 20, 20, 0.5),
   rgba(20, 20, 20, 0.6),
   rgba(20, 20, 20, 0.8)
  ),
  ${(props) =>
    props.imageCard ? `url(${props.imageCard})` : `url(${defaultImg})`}
   no-repeat center;
 background-size: cover;
 box-shadow: rgba(0, 0, 0, 0.3) 0 0 5px 5px;
`;

export const DetailsContainer = styled.div`
 padding: 20px;
 padding-bottom: 0;
`;

export const StyledHeading = styled(HeadingH2)`
 margin-top: 0;
`;
