import Lottie from "react-lottie";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SubmitBtn from "../../components/SubmitBtn";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const { loginUser, setUser } = useAuth();
  const [showPassword, setShowPassWord] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const email = watch("email");
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser({ ...user });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="content-box p-10 my-5">
      <h2 className="text-4xl font-black pb-2 ">Welcome Back</h2>
      <p className="font-semibold">Login with ZapShift</p>
      <div className="flex-1 w-full mt-5">
        <div className="bg-base-100 w-full md:max-w-sm ">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <fieldset className="fieldset">
              {/* email  */}
              <label className="label">Your Email</label>
              {errors.email && (
                <p className="text-error text-xs">{errors.email.message}</p>
              )}
              <input
                type="email"
                className={`input w-full ${
                  errors?.email ? "input-error" : "input-success"
                } `}
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "please submit your email address",
                })}
              />
              {/* password   */}
              <label className="label">Enter your Password</label>
              {errors.password && (
                <p className="text-error text-xs">{errors.password.message}</p>
              )}
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className={`input w-full ${
                    errors?.password ? "input-error" : "input-success"
                  } `}
                  placeholder="Password"
                  {...register("password", {
                    required: "please submit your password too",
                  })}
                />
                <div className="absolute right-6 bottom-2 z-10">
                  <FaEye
                    onClick={() => setShowPassWord(true)}
                    className={`text-accent cursor-pointer ${
                      showPassword ? "hidden" : "block"
                    }`}
                    size={20}
                  ></FaEye>

                  <FaEyeSlash
                    onClick={() => setShowPassWord(false)}
                    className={`text-accent cursor-pointer ${
                      showPassword ? "block" : "hidden"
                    }`}
                    size={20}
                  ></FaEyeSlash>
                </div>
              </div>

              <div>
                <Link
                  state={{ email, location: location.state }}
                  to="/forget-password"
                  className="link link-hover"
                >
                  Forgot password?
                </Link>
              </div>

              {loginError && <p className="text-error text-xs">{loginError}</p>}

              <button
                disabled={isSubmitting}
                className="btn btn-primary text-black mt-4"
              >
                Login Now
              </button>

              <div className="mt-3">
                <p>
                  Don't have an Account ?{" "}
                  <Link
                    to="/register"
                    className="link link-hover text-secondary font-semibold"
                    state={location.state}
                  >
                    Register Now
                  </Link>
                </p>
              </div>
            </fieldset>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
