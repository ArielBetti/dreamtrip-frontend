import { ProductCard, Search } from "@/components/compose";
import { TProductCardProps } from "@/components/compose/ProductCard/ProductCard";
import { AppStrings } from "@/strings/app.strings";

const mockProducts: TProductCardProps[] = [
  {
    onClick: () => console.log('card'),
    title: 'Produto 1',
    price: 19.99,
    rating: 4,
    location: 'Cidade A',
    description: 'Descrição do Produto 1...',
    image: 'https://img.freepik.com/fotos-gratis/mar-e-praia_1203-3516.jpg?w=360&t=st=1700449638~exp=1700450238~hmac=8ed90ab147e7928817514da728b4b99f8e410d6fb6ce6f9002e908cba0ffa770',
  },
  {
    onClick: () => console.log('card'),

    title: 'Produto 2',
    price: 29.99,
    rating: 3.5,
    location: 'Cidade B',
    description: 'Descrição do Produto 2...',
    image: 'https://example.com/product2.jpg',
  },
  {
    onClick: () => console.log('card'),

    title: 'Produto 3',
    price: 14.99,
    rating: 5,
    location: 'Cidade C',
    description: 'Descrição do Produto 3...',
    image: 'https://example.com/product3.jpg',
  },
  {
    onClick: () => console.log('card'),

    title: 'Produto 4',
    price: 24.99,
    rating: 4.5,
    location: 'Cidade D',
    description: 'Descrição do Produto 4...',
    image: 'https://example.com/product4.jpg',
  },
  {
    onClick: () => console.log('card'),

    title: 'Produto 5',
    price: 34.99,
    rating: 4,
    location: 'Cidade E',
    description: 'Descrição do Produto 5...',
    image: 'https://example.com/product5.jpg',
  },
];

const Home = () => {
  return (
    <div className="container px-6 m-auto py-10">
      <h2 className="text-2xl font-semibold tracking-tight py-2">
        {AppStrings.homeAppTitle}
      </h2>

      <Search />
      <div className="flex flex-col items-start justify-start gap-3 py-3">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-lg font-semibold tracking-tight">
            {AppStrings.popularPackages}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-row flex-col w-full">

        {mockProducts.map((item) =>
          <ProductCard
            onClick={item.onClick}
            price={item.price}
            rating={item.rating}
            title={item.title}
            location={item.location}
            description={item.description}
            image={item.image}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
