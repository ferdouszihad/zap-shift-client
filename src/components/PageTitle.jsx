const PageTitle = ({ title, subtitle }) => {
  return (
    <div data-aos="fade-in" data-aos-duration={1500} className="space-y-5">
      <h2 className="text-5xl text-secondary font-bold">{title}</h2>
      <p className="text-info max-w-xl">{subtitle}</p>
      <div className="divider mt-8"></div>
    </div>
  );
};

export default PageTitle;
