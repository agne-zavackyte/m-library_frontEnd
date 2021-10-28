import React from "react";
import { Section } from "../";
import { links } from "../../utils/data";
import * as S from "./Footer.style";

const Footer = () => {
 return (
  <S.Footer>
   <Section>
    {links.map((link) => (
     <S.Link
      key={link.id}
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
     >
      <img src={link.icon} alt={link.alt} />
     </S.Link>
    ))}
   </Section>
  </S.Footer>
 );
};

export default Footer;
