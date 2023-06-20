import classNames from "classnames";
import React from "react";

import classes from "./BadgeImage.module.scss";

interface BadgeImageProps {
  url: string;
  small?: boolean;
  className?: string;
}

const BadgeImage = ({ small, url, className }: BadgeImageProps) => {
  return (
    <div
      className={classNames(
        classes.BadgeImage,
        { [classes.Small]: small },
        className
      )}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default BadgeImage;
