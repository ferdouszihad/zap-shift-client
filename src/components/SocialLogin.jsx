import { BsGithub, BsGoogle } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ role }) => {
  const { googleLogin, setUser, fbLogin } = useAuth();
  const navigate = useNavigate();
  console.log(role);

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      setUser(res.user);
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
