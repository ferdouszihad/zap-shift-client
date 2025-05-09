import Lottie from "react-lottie";
import Header from "../../components/Header";
import construction from "../../assets/json/construct.json";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router";

const Error404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: construction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main className="flex flex-col lg:flex-row items-center">
        <div className="flex-1 ">
          <Lottie options={defaultOptions}></Lottie>
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <p className="text-2xl font-semibold text-accent">
            Opps! We are cooking 🍳
          </p>
          <h2 className="text-4xl font-bold">
            This Page is Currently Under{" "}
            <span className="text-error text-shadow-accent">Construction</span>
          </h2>
          <Link to="/" className="btn btn-primary  rounded-full text-black">
            <BiHome size={16}></BiHome> Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Error404;
