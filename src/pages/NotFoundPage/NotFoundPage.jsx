import React from "react";
import { Main, Section } from "../../components";
import { page404 } from "../../assets";
import * as S from "./NotFoundPage.style";

function NotFoundPage() {
 return (
  <Main cover={page404}>
   <Section>
    <S.Align> 404: page not found.</S.Align>
   </Section>
  </Main>
 );
}

export default NotFoundPage;
