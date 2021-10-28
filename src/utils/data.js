import { userIcon, privacyIcon, github, linkedin, instagram } from "../assets";

export const userData = [
 {
  name: "username",
  placeholder: "enter username",
  type: "text",
  icon: userIcon,
 },
 {
  name: "password",
  placeholder: "enter password",
  type: "password",
  icon: privacyIcon,
 },
];

export const links = [
 {
  id: 1,
  href: "https://github.com/agne-zavackyte",
  icon: github,
  alt: "Github",
 },
 {
  id: 2,
  href:
   "https://www.linkedin.com/in/agn%C4%97-zavackyt%C4%97-%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-276363124/",
  icon: linkedin,
  alt: "LinkedIn",
 },
 {
  id: 3,
  href: "https://www.instagram.com/agnytezavacku/",
  icon: instagram,
  alt: "Instagram",
 },
];
