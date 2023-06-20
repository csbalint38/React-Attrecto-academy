import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import UserCard from "../../components/user-card/UserCard";
import AccessController from "../../components/access-controller/AccessController";
import { UserModel } from "../../models/user.model";
import { BadgeModel } from "../../models/badges.model";
import { usersService } from "../../services/user.service";
import { badgeService } from "../../services/badges.service";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [badges, setBadges] = useState<BadgeModel[]>([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await usersService.getUsers());
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await usersService.getUsers());
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgeService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string) => {
    await usersService.deleteUser(id);
    fetchUsers();
  };

  return (
    <Page title="Users">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button className="w-100 mb-3" onClick={goToUserPage}>
              Create User
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
            <UserCard
              user={user}
              handleDeleteUser={handleDeleteUser}
              badges={badges}
            />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default UsersPage;
