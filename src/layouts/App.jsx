import { Outlet, useLocation, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Loading from "../pages/utils/Loading";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const navigation = useNavigation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return (
    <div className="bg-base-200 min-h-screen pb-5 scroll-smooth overflow-hidden">
      {user && (
        <p className="bg-primary py-1 text-center font-semibold">
          Welcome Mr. {user?.displayName}
        </p>
      )}
      <header className="content-box py-5 ">
        <Header></Header>
      </header>
      <main className="min-h-[calc(100vh-480px)]">
        {navigation.state == "loading" ? (
          <Loading></Loading>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
