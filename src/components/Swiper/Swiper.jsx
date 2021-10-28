import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
import { Section, MovieDetails } from "./../index.js";
import "swiper/swiper-bundle.css";
import * as S from "./Swiper.style";
import { arrayOf, object } from "prop-types";
SwiperCore.use([Autoplay, EffectCoverflow]);

const SwiperConfigs = {
 centeredSlides: true,
 loop: true,
 autoplay: { delay: 9000, disableOnInteraction: false },
 grabCursor: true,

 effect: "coverflow",
 breakpoints: {
  // when window width is >= 480px
  480: {
   slidesPerView: 1,
   spaceBetween: 30,
  },
  // when window width is >= 680px
  680: {
   slidesPerView: 1.25,
   spaceBetween: 20,
  },
  // when window width is >= 990px
  990: {
   slidesPerView: 1.7,
   spaceBetween: 20,
  },
 },
 coverflowEffect: {
  rotate: 10,
  stretch: 0,
  depth: 50,
  modifier: 2,
  slideShadows: false,
 },
};

const ParallaxBlock = ({ movieData }) => {
 return (
  <Swiper {...SwiperConfigs}>
   <Section>
    {movieData &&
     movieData.length > 0 &&
     movieData.map((data, index) => (
      <SwiperSlide key={index}>
       <S.SlideCard imageCard={data.fanart}>
        <S.DetailsContainer>
         <S.StyledHeading>{data.title}</S.StyledHeading>
         <MovieDetails movie={data} />
        </S.DetailsContainer>
       </S.SlideCard>
      </SwiperSlide>
     ))}
   </Section>
  </Swiper>
 );
};

ParallaxBlock.propTypes = {
 movieData: arrayOf(object),
};

export default ParallaxBlock;
