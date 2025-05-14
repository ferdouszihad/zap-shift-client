import Lottie from "react-lottie";
import loginAnimation from "../../assets/json/login.json";
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
  console.log(showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
    <div className="container py-10">
      <h2 className="text-5xl font-bold text-center pb-5">
        Welcome !! <span className="text-secondary">Let's Login</span>
      </h2>
      <div className=" flex flex-col lg:flex-row  items-center">
        <div className="flex-1">
          <div className="card bg-base-100 w-full mx-auto lg:max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                {/* email  */}
                <label className="label">Your Email</label>
                {errors.email && (
                  <p className="text-error text-xs">{errors.email.message}</p>
                )}
                <input
                  type="email"
                  className={`input ${
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
                  <p className="text-error text-xs">
                    {errors.password.message}
                  </p>
                )}
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`input ${
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
                  <Link className="link link-hover">Forgot password?</Link>
                </div>

                {loginError && (
                  <p className="text-error text-xs">{loginError}</p>
                )}

                <SubmitBtn className="btn btn-neutral mt-4">
                  Login Now
                </SubmitBtn>

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
        <div className="flex-1">
          <div className="max-w-[400px] mx-auto">
            <Lottie
              className="w-full"
              options={{
                animationData: loginAnimation,
                autoplay: true,
                loop: false,
              }}
            ></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
