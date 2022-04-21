import { getUserById } from "api/users";
import { Layout } from "components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import styles from "../../styles/RootPages.module.scss";

export const Home = () => {
  const [profile, setProfile] = useState<User>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    } else {
      getUserById(localStorage.getItem("userId"))
        .then((res: any) => {
          if (res.status === 200) {
            setProfile((prevState) => ({
              ...prevState,
              name: res.data.name,
              surname: res.data.surname,
              email: res.data.email,
              gender: res.data.gender,
              id: res.data.id,
              role: res.data.role,
            }));
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div className={styles.page}>
      <UserProfileContext.Provider value={profile}>
        <Layout />
      </UserProfileContext.Provider>
    </div>
  );
};
