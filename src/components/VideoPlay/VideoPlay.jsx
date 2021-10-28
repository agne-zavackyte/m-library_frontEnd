import React from "react";
import { useVideo } from "react-use";
import * as S from "./VideoPlay.style";
import { string } from "prop-types";

const VideoPlay = ({ src }) => {
  const [video] = useVideo(
    <S.Video src={src} autoPlay muted={true} controls />
  );

  return <div>{video}</div>;
};

VideoPlay.propTypes = {
  src: string,
};

export default VideoPlay;
