import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { userApi } from "api/users";
import { Layout } from "components";
import { UserProfileContext } from "types/contexts";
import { PageWrapper } from "features/page-wrapper/PageWrapper";

export const Home = () => {
  const navigate = useNavigate();

  const { data: profile } = useQuery(
    "logged",
    () => userApi.getUserById(localStorage.getItem("userId")),
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
    <PageWrapper>
      <UserProfileContext.Provider value={profile}>
        <Layout />
      </UserProfileContext.Provider>
    </PageWrapper>
  );
};
