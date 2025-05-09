import Lottie from "react-lottie";
import registerAnimation from "../../assets/json/register.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SubmitBtn from "../../components/SubmitBtn";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { createUser, updateUser, setUser } = useAuth();
  const [showPassword, setShowPassWord] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  console.log(showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { name, email, photo, password } = data;
    createUser(email, password)
      .then((res) => {
        const user = res.user;

        setUser({ ...user });

        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
          navigate("/");
        });
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="container py-10">
      <h2 className="text-5xl font-bold text-center pb-5">
        Sign up as a <span className="text-secondary">Merchant</span>
      </h2>
      <div className=" flex flex-col lg:flex-row-reverse  items-center">
        <div className="flex-1">
          <div className="card bg-base-100 w-full mx-auto lg:max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                {/* name  */}
                <label className="label">Your Name</label>
                {errors.name && (
                  <p className="text-error text-xs">{errors.name.message}</p>
                )}
                <input
                  type="text"
                  className={`input ${
                    errors?.name ? "input-error" : "input-success"
                  } `}
                  placeholder="Enter your Official Name"
                  {...register("name", {
                    required: "please provide a valid name",
                  })}
                />

                {/* photo  */}
                <label className="label">Your Photo URL</label>
                {errors.photo && (
                  <p className="text-error text-xs">{errors.photo.message}</p>
                )}
                <input
                  type="url"
                  className={`input ${
                    errors?.photo ? "input-error" : "input-success"
                  } `}
                  placeholder="Enter your Photo"
                  {...register("photo", {
                    required: "pleae provide a valid photo",
                  })}
                />

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
                    required: "please provide a valid email address",
                  })}
                />
                {/* password   */}
                <label className="label">Create a Password</label>
                {errors.password && (
                  <p className="text-error text-xs">
                    password must be 6 characters long with a minimum 1
                    uppercase letter
                  </p>
                )}
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`input ${
                      errors?.password ? "input-error" : "input-success"
                    } `}
                    placeholder="Password"
                    {...register("password", { pattern: /^(?=.*[A-Z]).{6,}$/ })}
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

                {loginError && (
                  <p className="text-error text-xs">{loginError}</p>
                )}

                <SubmitBtn className="btn btn-neutral mt-4">Register</SubmitBtn>

                <div className="mt-3">
                  <p>
                    Allready have an Account ?{" "}
                    <Link
                      to="/login"
                      className="link link-hover text-secondary font-semibold"
                    >
                      Login Now
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <Lottie
              className="w-full"
              options={{
                animationData: registerAnimation,
                autoplay: true,
                loop: true,
              }}
            ></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
