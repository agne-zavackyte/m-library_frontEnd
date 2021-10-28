import styled from "styled-components";

export const Form = styled.form`
 width: 100%;
`;

export const ReviewTextArea = styled.textarea`
 width: 100%;
 max-height: 150px;
 margin-bottom: 20px;
 padding: 10px;
 font-weight: 200;
 border-radius: 4px;
 border: 1px solid ${(props) => props.theme.mainStyle.primary};
 color: ${(props) => props.theme.mainStyle.text};
 background: ${(props) => props.theme.mainStyle.bodyCol};
 outline: none;
 resize: none;
 overflow: hidden;
 box-sizing: border-box;
`;
