import React from "react";
import * as S from "./Section.style";
import { any, bool } from "prop-types";

const Section = ({ children, fullWidth }) => {
  return (
    <S.Section>
      {!fullWidth && <S.Container>{children}</S.Container>}
      {fullWidth && children}
    </S.Section>
  );
};

Section.propTypes = {
  children: any,
  fullWidth: bool,
};

export default Section;
