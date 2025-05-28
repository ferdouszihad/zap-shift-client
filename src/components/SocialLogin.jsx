import { BsGithub, BsGoogle } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin, setUser, fbLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      const user = res.user;
      setUser(res.user);

      const newUser = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        role: "merchant",
        createdAt: new Date().toISOString(),
      };

      axiosPublic.post("/user", newUser).then((res) => {
        if (res.data.insertedId) {
          Swal.fire(`Welcome ${user.displayName}`, "", "success");
        }
      });
      navigate(location.state ? location.state : "/");
      navigate("/");
    });
  };

  const handleFbLogin = () => {
    fbLogin().then((res) => {
      setUser(res.user);
      navigate("/");
    });
  };
  return (
    <div className="flex justify-between">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="btn btn-outline btn-neutral"
      >
        Login with <FcGoogle></FcGoogle>
      </button>
      <button
        onClick={handleFbLogin}
        type="button"
        className="btn btn-outline btn-neutral  "
      >
        Login with{" "}
        <BiLogoFacebookCircle
          className="text-blue-500"
          size={20}
        ></BiLogoFacebookCircle>
      </button>
    </div>
  );
};

export default SocialLogin;
