import React from "react";
import * as S from "./Main.style";
import { any, bool, string } from "prop-types";

const Main = ({ bgSize, billboard, children, cover }) => {
 return (
  <>
   {billboard && (
    <S.Main>
     <S.Position height={bgSize} billboard={billboard}>
      <S.Billboard height={bgSize}>
       <S.BilboardImage src={cover} />
      </S.Billboard>
     </S.Position>
     {children}
    </S.Main>
   )}
   {!billboard && (
    <S.MainBasic src={cover}>
     <S.Position billboard={billboard}>{children}</S.Position>
    </S.MainBasic>
   )}
  </>
 );
};

Main.propTypes = {
 bgSize: string,
 billboard: bool,
 children: any,
 cover: string,
};

export default Main;
