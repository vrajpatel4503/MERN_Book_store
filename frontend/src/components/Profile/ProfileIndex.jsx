import { useSelector } from "react-redux";
import Favourite from "../Profile/Favourite";
import Allorder from "../../pages/Allorder";

const ProfileIndex = () => {
  // console.log("Rendering ProfileIndex")

  const role = useSelector((state) => state.auth.role);
  // console.log("Current role:", role);

  if (!role) {
    return <div className="text-white p-4">Loading profile...</div>;
  }

  if (role.toLowerCase() === "admin") {
    return <Allorder />;
  }

  return <Favourite />;
};

export default ProfileIndex;
