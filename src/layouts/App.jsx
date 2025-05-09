import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="bg-base-200 min-h-screen pb-5">
      {user && (
        <p className="bg-primary py-1 text-center font-semibold">
          Welcome Mr. {user?.email}
        </p>
      )}
      <header className="container py-5 ">
        <Header></Header>
      </header>
      <main className="min-h-[calc(100vh-480px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
