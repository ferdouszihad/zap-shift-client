import { useLoaderData } from "react-router";
import PageTitle from "../../components/PageTitle";
import WareHouseCard from "./WareHouseCard";

const Coverage = () => {
  const warehouses = useLoaderData();

  return (
    <div className="container">
      <PageTitle
        title={"Our Coverage"}
        subtitle={"We provide Service across each of the part of bangladesh"}
      ></PageTitle>

      <div className="grid md:grid-cols-2  gap-5">
        {warehouses.map((wh) => (
          <WareHouseCard key={wh._id} data={wh}></WareHouseCard>
        ))}
      </div>
    </div>
  );
};

export default Coverage;
