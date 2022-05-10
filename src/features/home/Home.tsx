import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { userApi } from "api/users";
import { Layout } from "components";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import { AufContainer } from "features/auf_container/AufContainer";

export const Home = () => {
  const [profile, setProfile] = useState<User>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    } else {
      userApi
        .getUserById(localStorage.getItem("userId"))
        .then((res) => {
          if (res?.status === 200) {
            setProfile((prevState) => ({
              ...prevState,
              name: res.data?.name,
              surname: res.data?.surname,
              email: res.data?.email,
              gender: res.data?.gender,
              id: res.data?.id,
              role: res.data?.role,
            }));
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <AufContainer>
      <UserProfileContext.Provider value={profile}>
        <Layout />
      </UserProfileContext.Provider>
    </AufContainer>
  );
};
