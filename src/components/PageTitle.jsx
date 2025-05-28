const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="rounded-xl text-white bg-secondary my-5 bg-[url(be-amerchant-bg.png)] p-5">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-base-300">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
