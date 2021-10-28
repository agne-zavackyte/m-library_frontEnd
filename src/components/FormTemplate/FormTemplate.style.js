import styled from "styled-components";
import { Button } from "../../components/Button/Button.style";

export const InputWrapper = styled.div`
 margin: 10px 0 20px;

 &:last-of-type {
  margin: 10px 0 30px;
 }
`;

export const StyledButton = styled(Button)`
 border: 1px solid ${(props) => props.theme.mainStyle.textOp5};
`;
