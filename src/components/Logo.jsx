import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-info ">
      <img className="w-8 relative left-5 bottom-2" src={logo} alt="" />
      <h2>ZapShift</h2>
    </div>
  );
};

export default Logo;
