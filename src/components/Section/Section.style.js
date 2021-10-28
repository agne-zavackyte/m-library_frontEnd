import styled from "styled-components";

export const Section = styled.section`
 position: relative;
 z-index: 1;
`;

export const Container = styled.div`
 margin: 0 auto;
 max-width: ${(props) => props.theme.mainStyle.width};
 padding: 20px;
 box-sizing: border-box;
`;
