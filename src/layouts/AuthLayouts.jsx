import { Outlet } from "react-router";
import Logo from "../components/Logo";
import authImage from "../assets/authImage.png";

const AuthLayouts = () => {
  return (
    <div>
      <main className="grid md:grid-cols-12">
        <div className="col-span-12 md:col-span-7 ">
          <header className="content-box mt-10">
            <Logo></Logo>
          </header>
          <div className="content-box">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="bg-[#FAFDF0] col-span-5 flex-col justify-center items-center min-h-screen hidden md:flex">
          <div className="">
            <img src={authImage} alt="" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayouts;
