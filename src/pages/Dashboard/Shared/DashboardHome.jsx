import PageTitle from "../../../components/PageTitle";
import useAuth from "../../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div className="content-box">
      <PageTitle
        title={`Welcome ${user.displayName} sir`}
        subtitle={`welcome to Dashboard. Enjoy your work today`}
      ></PageTitle>
    </div>
  );
};

export default DashboardHome;
