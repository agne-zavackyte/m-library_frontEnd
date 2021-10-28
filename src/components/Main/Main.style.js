import styled from "styled-components";
import defaultImg from "../../assets/blury-lights2.jpeg";

export const Main = styled.main`
 width: 100%;
 min-height: calc(100vh - 102px);
 padding-bottom: 40px;
 z-index: 0;
 box-sizing: border-box;
`;

export const MainBasic = styled.main`
 width: 100%;
 min-height: calc(100vh - 102px);
 padding-bottom: 40px;
 background: linear-gradient(
   to bottom,
   rgba(20, 20, 20, 1),
   rgba(20, 20, 20, 0.8),
   rgba(20, 20, 20, 1)
  ),
  ${(props) => (props.src ? `url(${props.src})` : "none")} no-repeat fixed
   center;
 background-size: cover;
 z-index: 0;
 box-sizing: border-box;
`;

export const Billboard = styled.div`
 width: 100%;
 height: ${(props) =>
  props.height === "fullHeight" ? "calc(100vh - 98px)" : "60vh"};
 position: absolute;
 top: 0;
 left: 0;
`;

export const BilboardImage = styled.div`
 height: 100%;
 display: flex;
 align-items: center;
 background: linear-gradient(
   to bottom,
   rgba(20, 20, 20, 0.2),
   rgba(20, 20, 20, 0.6),
   rgba(20, 20, 20, 1)
  ),
  ${(props) => (props.src ? `url(${props.src})` : `url(${defaultImg})`)}
   no-repeat top center;
 background-size: cover;
`;

export const Position = styled.div`
 padding-top: ${(props) => (props.billboard ? "35vh" : "20vh")};
 margin-top: -99px;
 box-sizing: border-box;
`;
