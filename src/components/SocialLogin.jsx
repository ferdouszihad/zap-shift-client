import { BsGithub, BsGoogle } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin, setUser } = useAuth();
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

  return (
    <div className="mt-3">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="btn btn-block"
      >
        <FcGoogle size={20}></FcGoogle>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
