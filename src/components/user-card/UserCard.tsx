import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "../button/Button";
import BadgeImage from "../badge-image/BadgeImage";
import { UserModel } from "../../models/user.model";
import { BadgeModel } from "../../models/badges.model";
import AccessController from "../access-controller/AccessController";
import { hasPermission } from "../../util/hasPermission";

import classes from "./UserCard.module.scss";

interface UserCardProps {
  user: UserModel;
  badges: BadgeModel[];
  handleDeleteUser: (userId: string) => void;
}

const UserCard = ({ user, badges, handleDeleteUser }: UserCardProps) => {
  const { id, image, name, badges: userBadges } = user;

  const allowedUserChangeFor: Role[] = ["ADMIN"];

  const showLink = hasPermission(allowedUserChangeFor);

  const renderUserCardContent = () => (
    <>
      <img
        src={image}
        alt={`user #${id}`}
        className={classNames(classes.UserImage, "card-img-top")}
      />
      <div className={classNames("card-body", classes.CardBody)}>
        <h5 className={classes.UserName}>{name}</h5>
      </div>
      <AccessController allowedFor={allowedUserChangeFor}>
        <Button
          className={classes.DeleteIcon}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteUser(id.toString());
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </AccessController>
      <div className={classes.Badges}>
        {userBadges?.map((badge) => {
          const found = badges.find((item) => item.id === badge.id);

          return found ? (
            <BadgeImage
              small
              url={found.image}
              key={badge.id}
              className={classes.BadgeImage}
            />
          ) : null;
        })}
      </div>
    </>
  );

  return showLink ? (
    <Link to={`/user/${id}`} className={classNames("card", classes.UserCard)}>
      {renderUserCardContent()}
    </Link>
  ) : (
    <div className={classNames("card", classes.UserCard, classes.NotLink)}>
      {renderUserCardContent()}
    </div>
  );
};

export default UserCard;
