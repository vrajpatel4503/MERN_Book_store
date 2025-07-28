import { useSelector } from "react-redux";
import Favourite from "../Profile/Favourite";
import Allorder from "../../pages/Allorder";

const RoleBasedProfileIndex = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "Admin") {
    return <Allorder />;
  }

  return <Favourite />;
};

export default RoleBasedProfileIndex;
