import PageTitle from "../../../components/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import DashboardAdmin from "../Admin/DashboardAdmin";
import DashboardAgent from "../Agent/DashboardAgent";
import DashboardMarchent from "../Marchent/DashboardMarchent";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  console.log(role);
  return (
    <div className="content-box pt-10">
      <PageTitle
        title={`Welcome ${user.displayName} sir`}
        subtitle={`welcome to Dashboard. Enjoy your work today`}
      ></PageTitle>

      {role == "merchant" && <DashboardMarchent></DashboardMarchent>}
      {role == "admin" && <DashboardAdmin></DashboardAdmin>}
      {role == "agent" && <DashboardAgent></DashboardAgent>}
    </div>
  );
};

export default DashboardHome;
