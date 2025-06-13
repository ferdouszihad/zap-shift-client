import Lottie from "react-lottie";
import Header from "../../components/Header";
import construction from "../../assets/json/construct.json";
import { BiHome } from "react-icons/bi";
import { Link, useRouteError } from "react-router";
import Footer from "../../components/Footer";

const Error404 = () => {
  const error = useRouteError();
  console.log(error);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: construction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-base-200">
      <header className="content-box py-5">
        <Header></Header>
      </header>
      <main className="flex flex-col justify-center items-center content-box  bg-base-100 my-5 p-10 rounded-2xl ">
        <p className="text-error text-center text-lg font-bold">
          Opps! Error Happened 🥺
        </p>
        <div className="flex-1 max-w-xs">
          <Lottie options={defaultOptions}></Lottie>
        </div>
        <div className="text-center space-y-5">
          <h2 className="text-4xl font-bold">{error.data}</h2>
          <Link to="/" className="btn btn-primary  rounded-full text-black">
            <BiHome size={16}></BiHome> Back to Home
          </Link>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Error404;
