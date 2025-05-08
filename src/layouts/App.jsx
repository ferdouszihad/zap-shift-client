import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="bg-base-200 min-h-screen pb-5">
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
