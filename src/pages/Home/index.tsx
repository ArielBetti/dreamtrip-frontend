import { ProductCard, Search } from "@/components/compose";
import { AppStrings } from "@/strings/app.strings";

const Home = () => {
  return (
    <div className="container px-6 m-auto py-10">
      <h2 className="text-2xl font-semibold tracking-tight">
        {AppStrings.homeAppTitle}
      </h2>

      <Search />
      <div className="flex flex-col items-start justify-start gap-3">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-lg font-semibold tracking-tight">
            {AppStrings.popularPackages}
          </span>
        </div>
        <ProductCard
          price={100}
          rating={3}
          title="Test"
          location="Test"
          description="Test"
          image="https://lp-cms-production.imgix.net/2023-03/shutterstock_785180992.jpg"
        />
      </div>
    </div>
  );
};

export default Home;
