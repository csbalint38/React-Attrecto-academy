import classNames from "classnames";
import React from "react";
import { BadgeModel } from "../../models/badges.model";
import BadgeImage from "../badge-image/BadgeImage";

import classes from "./Badge.module.scss";

interface BadgeProps {
  badge: BadgeModel;
  className?: string;
}

const Badge = ({ badge, className }: BadgeProps) => {
  const { image, name, description } = badge;
  return (
    <div
      className={classNames(
        "d-flex box-shadow align-items-center",
        classes.Badge
      )}
    >
      <BadgeImage url={image} />
      <div className="d-flex flex-column">
        <h5 className="ms-3">{name}</h5>
        <p className="ms-3 text-black-50">{description}</p>
      </div>
    </div>
  );
};

export default Badge;
