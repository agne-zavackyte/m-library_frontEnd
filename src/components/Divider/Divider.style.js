import styled from "styled-components";

export const Divider = styled.div`
 width: ${(props) => (props.customWidth ? props.customWidth : "100%")};
 height: 1px;
 background-color: ${(props) => props.theme.mainStyle.textOp5};
`;
