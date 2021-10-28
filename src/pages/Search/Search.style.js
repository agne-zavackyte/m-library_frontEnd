import styled from "styled-components";
import { Divider } from "../../components/Divider/Divider.style";

export const Form = styled.form`
 width: 100%;
`;

export const StyledDivider = styled(Divider)`
 margin: 20px 0;
`;

export const NotifContainer = styled.div`
 max-width: ${(props) => props.theme.mainStyle.width};
 margin: 0 auto;
 padding: 0 20px;
 box-sizing: border-box;
`;
