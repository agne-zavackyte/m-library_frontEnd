import React, { useContext, useState } from "react";
import { login } from "../func";
import { FormTemplate, Main, Notification } from "../../components";
import { userData } from "../../utils/data";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { loginWall } from "../../assets";
import * as S from "./Login.style";

const Login = () => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const [error, setError] = useState(null);

 return (
  <Main bgSize="fullHeight" cover={loginWall}>
   <S.LoginContainer>
    {error && <Notification>{error}</Notification>}
    <FormTemplate
     fields={userData}
     type="submit"
     btnName="LOG IN"
     callback={(fieldValues) => login(fieldValues, auth, setError, history)}
    />
   </S.LoginContainer>
  </Main>
 );
};

export default Login;
