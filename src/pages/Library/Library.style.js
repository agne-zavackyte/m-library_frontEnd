import styled from "styled-components";
import { Input } from "../../components/InputField/InputField.style";

export const ButtonContainer = styled.div`
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 padding-top: 10px;
`;

export const ButtonFlexWrap = styled.div`
 display: flex;
 :not(:last-child) {
  margin-right: 10px;
 }

 margin-bottom: 10px;
`;

export const StyledInputField = styled(Input)`
 display: ${(props) => (props.inputIsDisplayed ? "block" : "none")};
 margin-left: ${(props) => (!props.inputIsDisplayed ? "0" : "-5px")};
 background-color: ${(props) => props.theme.mainStyle.primary};
`;
