import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { userApi } from "api/users";
import { Layout } from "components";
import { UserProfileContext } from "types/contexts";
import { AufContainer } from "features/auf_container/AufContainer";

export const Home = () => {
  const navigate = useNavigate();

  const { data: profile } = useQuery(
    "logged",
    async () => {
      const result = await userApi.getUserById(localStorage.getItem("userId"));
      return result;
    },
    {
      enabled: localStorage.getItem("userId") !== null,
      onError: () => {
        navigate("/login");
      },
    }
  );

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AufContainer>
      <UserProfileContext.Provider value={profile?.data}>
        <Layout />
      </UserProfileContext.Provider>
    </AufContainer>
  );
};
