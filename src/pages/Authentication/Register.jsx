import Lottie from "react-lottie";
import registerAnimation from "../../assets/json/register.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SubmitBtn from "../../components/SubmitBtn";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import SocialLogin from "../../components/SocialLogin";
import { MdDeliveryDining } from "react-icons/md";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, setUser } = useAuth();
  const [showPassword, setShowPassWord] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeAvatar, setActiveAvatar] = useState("");
  const [imgError, setimgError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState([
    "https://img.icons8.com/?size=96&id=81120&format=png",
    "https://img.icons8.com/?size=96&id=80989&format=png",
    "https://img.icons8.com/?size=96&id=80615&format=png",
    "https://img.icons8.com/?size=96&id=81026&format=png",
    "https://img.icons8.com/?size=96&id=81802&format=png",
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const imgbb_key = import.meta.env.VITE_imgbb_api_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  const axiosPublic = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImgUpload = async (e) => {
    setimgError("");
    setIsUploading(true);
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      setAvatar([...avatar, res.data.data.display_url]);
      setActiveAvatar(res.data.data.display_url);
      setIsUploading(false);
    } else {
      setIsUploading(false);
      setimgError("Something went wrong. try again or choose exesting avatar");
    }
  };

  const onSubmit = async (data) => {
    // console.log(data);
    setLoginError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { name, email, password } = data;
    if (!activeAvatar) {
      setimgError("Please select an avatar");
      return;
    }
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser({ ...user });
        navigate(location.state ? location.state : "/");
        updateUser({ displayName: name, photoURL: activeAvatar }).then(() => {
          setUser({ ...user, displayName: name, photoURL: activeAvatar });

          const newUser = {
            displayName: name,
            photoURL: activeAvatar,
            email: user.email,
            role: "merchant",
            createdAt: new Date().toISOString(),
          };

          axiosPublic.post("/user", newUser).then((res) => {
            if (res.data.insertedId) {
              Swal.fire(`Welcome ${name}`, "You are All Set", "success");
            }
          });
        });
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="content-box py-10 gap-10">
      <h2 className="text-5xl font-bold text-center pb-5">
        Sign up as a <span className="text-secondary">Merchant</span>
      </h2>
      <div className=" flex flex-col-reverse md:flex-row-reverse  items-center">
        <div className="flex-1 w-full">
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
                  className={`input w-full ${
                    errors?.name ? "input-error" : "input-success"
                  } `}
                  placeholder="Enter your Official Name"
                  {...register("name", {
                    required: "please provide a valid name",
                  })}
                />

                {/* photo  */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose an Avatar</span>
                  </label>

                  <div className="flex gap-2 flex-wrap items-center">
                    {avatar.map((av) => (
                      <div
                        onClick={() => {
                          setActiveAvatar(av);
                          setimgError("");
                        }}
                        className={`p-px rounded-full border-2 border-base-200 cursor-pointer ${
                          activeAvatar == av && "border-success"
                        }`}
                        key={av}
                      >
                        <img className="w-10 rounded-full" src={av} alt="" />
                      </div>
                    ))}
                    <div
                      onClick={() => inputRef?.current.click()}
                      className="w-10 h-10 p-2 bg-base-200 rounded-full cursor-pointer"
                    >
                      <img
                        className=""
                        src="https://img.icons8.com/?size=96&id=8ax09IWlr80n&format=png"
                        alt=""
                      />
                      <input
                        onChange={handleImgUpload}
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        name=""
                        id=""
                        accept=".jpg,.jpeg,.png"
                      />
                    </div>

                    {imgError && (
                      <p className="text-error text-xs">{imgError}</p>
                    )}
                  </div>
                </div>

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
                <div className="relative mb-4">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className={`input w-full ${
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

                {isUploading && (
                  <p className="text-success text-xs">
                    Image is Uploading . please wait
                  </p>
                )}

                <button
                  disabled={isSubmitting || isUploading}
                  className="btn btn-neutral  "
                >
                  {isSubmitting ? "Registering.." : "Register Now"}
                </button>

                <div className="mt-3">
                  <p>
                    Allready have an Account ?{" "}
                    <Link
                      to="/login"
                      className="link link-hover text-secondary font-semibold"
                      state={location.state}
                    >
                      Login Now
                    </Link>
                  </p>
                </div>
              </fieldset>
              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-[200px] md:max-w-[450px]">
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
