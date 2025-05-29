import Lottie from "react-lottie";
import PageTitle from "../../components/PageTitle";
import rider from "../../assets/json/rider.json";
// import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import useWareHouseData from "../../hooks/useWareHouseData";
import Swal from "sweetalert2";

const RiderRegistraion = () => {
  const { user } = useAuth();
  const region = useLoaderData();
  const navigate = useNavigate();

  const { warehouses } = useWareHouseData();
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("Great", "Our Team will Analyze your Request", "success");
    navigate("/");
  };

  return (
    <div className="container pb-5">
      <PageTitle
        title={"Earn with ZapShift"}
        subtitle={"Be a Rider and Earn with Zap-Shift"}
      ></PageTitle>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-base-100 rounded-xl p-5 shadow">
          <h2 className="font-bold text-2xl">Tell Us About Yourself</h2>

          <form onSubmit={handleSubmit} className="form my-5 space-y-3">
            <div className="form-control flex gap-2">
              <div className="User-Name flex-2">
                <label>Your Name</label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  className="input w-full"
                  readOnly
                />
              </div>
              <div className="User-Age flex-1">
                <label>Your Age</label>
                <input
                  required
                  type="number"
                  min={18}
                  max={57}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="form-control flex gap-2">
              <div className="">
                <label>Your Email</label>
                <input
                  readOnly
                  defaultValue={user?.email}
                  type="email"
                  className="input w-full"
                />
              </div>
              <div className="region flex-1">
                <label>Region</label>
                <select required className="select block">
                  <option value="" disabled selected>
                    Select Your Region
                  </option>
                  {region.map((div) => (
                    <option value={div}>{div}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control flex gap-2">
              <div className="User-Contact flex-1">
                <label>Contact No.</label>
                <input required type="tel" className="input w-full" />
              </div>
              <div className="NID flex-1">
                <label>Your NID</label>
                <input
                  required
                  type="number"
                  min={18}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="form-control ">
              <div className="region flex-1">
                <label>Which Ware-House You want to work ?</label>
                <select required className="select block w-full">
                  <option value="" disabled selected>
                    Select Your Region
                  </option>
                  {warehouses?.map((wh) => (
                    <option value={wh._id}>
                      {wh.city} [ {wh.covered_area.join(" , ")} ]
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-primary text-black btn-block"
              >
                Be a Rider
              </button>
            </div>
          </form>
        </div>
        <div className="w-full">
          <Lottie options={{ animationData: rider }}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default RiderRegistraion;
