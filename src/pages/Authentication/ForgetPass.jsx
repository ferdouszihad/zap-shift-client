import Lottie from "react-lottie";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SubmitBtn from "../../components/SubmitBtn";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/SocialLogin";
import Swal from "sweetalert2";

const ForgetPass = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    resetPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Please Check Your Email",
          showConfirmButton: false,
          timer: 3500,
        });

        navigate("/login", { state: location?.state?.location });

        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
        }, 3500);
      })

      .catch((err) => {
        Swal.fire("Opps", err.code, "error");
      });
  };

  return (
    <div className="content-box p-10 my-5">
      <h2 className="text-4xl font-black pb-2 ">Forget Pasword</h2>
      <p className="">
        Enter your email address and we’ll send you a reset link.
      </p>
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
                defaultValue={location?.state?.email || ""}
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "please submit your email address",
                })}
              />
              {/* password   */}

              <div>
                <Link to="/forget-password" className="link link-hover">
                  Forgot password?
                </Link>
              </div>

              <button
                disabled={isSubmitting}
                className="btn btn-primary text-black mt-4"
              >
                Send Now
              </button>

              <div className="mt-3">
                <p>
                  Remember Password ?{" "}
                  <Link
                    to="/login"
                    state={location?.state?.location}
                    className="link link-hover text-secondary font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
