import { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../context/user/userContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

// components
import WishList from "../components/Account/WishList";
import PersonalInfo from "../components/Account/PersonalInfo";
import PostAPlant from "../components/Account/PostAPlant";
import PlantPosts from "../components/Account/PlantPosts";
import Orders from "../components/Account/Orders";
import Cart from "../components/Account/Cart";
import { toast } from "react-toastify";

export default function Account() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [view, setView] = useState(searchParams.get("view"));
  const [user, setUser] = useState({});
  const { user: oldUser, dispatch } = useContext(UserContext);
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id: oldUser.id,
    },
  });

  useEffect(() => {
    setView(searchParams.get("view"));
  }, [pathname, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("greenhouseUserToken");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    toast.success("you are logged out");
  };

  if (data && !user.id) {
    setUser(data.user);
  }

  if (!oldUser.id && !loading) {
    navigate("/login");
  }

  if (!user.id || loading) {
    return <>Loading...</>;
  }

  return (
    <MainWrapper>
      <h2 className="username">Hello {oldUser.firstName},</h2>
      <div className="tabs">
        <ul className="tab-titles">
          <li
            className={view === "personalInfo" ? "active" : ""}
            onClick={() => setView("personalInfo")}
          >
            Personal Info
          </li>
          <li
            className={view === "wishlist" || view === null ? "active" : ""}
            onClick={() => setView("wishlist")}
          >
            Your WishList
          </li>
          <li
            className={view === "orders" ? "active" : ""}
            onClick={() => setView("orders")}
          >
            Orders
          </li>
          <li
            className={view === "cart" ? "active" : ""}
            onClick={() => setView("cart")}
          >
            Cart
          </li>
          <li
            className={view === "postAPlant" ? "active" : ""}
            onClick={() => setView("postAPlant")}
          >
            Post a Plant
          </li>
          <li
            className={view === "myPlantPost" ? "active" : ""}
            onClick={() => setView("myPlantPost")}
          >
            My Plant Posts
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
        {(view === "wishlist" || view === null) && (
          <WishList user={user} dispatch={dispatch} setUser={setUser} />
        )}
        {view === "personalInfo" && (
          <PersonalInfo user={user} dispatch={dispatch} setUser={setUser} />
        )}
        {view === "myPlantPost" && <PlantPosts user={user} />}
        {view === "postAPlant" && <PostAPlant user={user} />}
        {view === "orders" && <Orders user={user} />}
        {view === "cart" && (
          <Cart user={user} dispatch={dispatch} setUser={setUser} />
        )}
      </div>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  max-width: 1100px;
  margin: 40px auto;
  padding: 5px;

  .username,
  .logout-btn {
    font-size: 22px;
    color: gray;
  }

  .tabs {
    display: flex;
    margin: 50px 0;
    gap: 40px;

    & > * {
      width: 100%;
    }
  }

  .tab-titles {
    max-width: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    color: gray;
    font-size: 18px;
    cursor: pointer;

    & .active {
      color: var(--green-medium);
    }
  }

  .logout-btn {
    margin: 30px 0;
  }

  @media (max-width: 968px) {
    .tabs {
      flex-direction: column;

      ul {
        border-bottom: 1px solid lightgray;
        margin: 0 auto;
        max-width: 100%;
        padding-bottom: 20px;
      }
    }
  }
`;
