import StarRating from "@/components/compose/StarRating";
import { Card } from "@/components/ui/card";
import IconComponent from "@/icons";
import { useGetSingleTravel } from "@/queries/useGetSingleTravel";
import { MapPinIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import PhotoViewer from "@/components/compose/PhotoViewer";
import FooterBooking from "@/components/compose/FooterBooking";
import ReviewComponent from "@/components/compose/Review";
import { reviewsComponentMock } from "@/mocks/reviews-component";
import TripSkeleton from "./Trip.skeleton";
import axios from "axios";
import TripError from "./Trip.error";
import { AppStrings } from "@/strings/app.strings";
import FavoriteToggle from "@/components/compose/FavoriteToggle";
import { useHeaderActions } from "@/store";

const Trip = () => {
  const { id } = useParams();
  const {
    data: travel,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSingleTravel(id || "");
  const { setHeader } = useHeaderActions();

  if (isLoading) {
    setHeader({
      loading: true,
      title: "",
    });

    return <TripSkeleton />;
  }

  if (isError) {
    setHeader({
      loading: false,
      title: "",
    });
    if (axios.isAxiosError(error)) {
      const refetchError = error.status !== 400;

      return (
        <TripError
          message={AppStrings.errorDefaultRefetch}
          title="Erro ao carregar a viagem"
          refetch={refetchError ? refetch : undefined}
        />
      );
    }

    return (
      <TripError
        message={AppStrings.errorDefaultNoRefetch}
        title="Erro ao carregar a viagem"
      />
    );
  }

  setHeader({
    loading: false,
    title: travel?.name || "",
  });

  return (
    <div className="container m-auto px-4 py-20 flex flex-col md:flex-row items-start justify-start gap-5">
      <div className="animate-fadeIn flex flex-col items-start justify-start gap-5 overflow-hidden">
        <div className="w-full rounded-lg overflow-hidden relative shadow-sm">
          <img
            src={travel?.image}
            alt="Foto de capa do local"
            className="w-full fit"
          />
          <div className="flex items-center absolute top-0 left-0 w-full h-full bg-zinc-950/50 text-white">
            <div className="rounded-full top-2 right-2 absolute bg-muted flex items-center justify-center h-10 w-10">
              <FavoriteToggle
                isFavorited={false}
                onClick={() => {}}
                isLoading={false}
              />
            </div>
            <div className="p-4 flex flex-col items-start justify-start gap-2">
              <h1 className="text-xl lg:text-4xl font-bold">{travel?.name}</h1>
              <div className="flex items-center justify-center gap-1 lg:text-lg">
                <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                <span>{`${travel?.location.country}, ${travel?.location.city}`}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <StarRating rating={travel?.rating || 0} />
                <p>{travel?.rating}</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-bold">Galeria de fotos</h2>
        <PhotoViewer images={travel?.gallery || []} />
      </div>
      <Card className="animate-downSlide flex flex-col items-start justify-start gap-4 h-full min-h-[770px] md:max-h-[770px] max-w-full rounded-xl p-2">
        <h2 className="font-bold">O que está incluso?</h2>
        <ScrollContainer
          vertical
          className="scroll-container flex gap-2 max-w-[300px]"
        >
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>{" "}
          <Card className="p-2 flex items-center justify-start gap-2 text-sm rounded-xl">
            <IconComponent name="plane" className="w-5 h-5 text-primary" />
            <p className="font-semibold">tesxte</p>
          </Card>
        </ScrollContainer>
        <h2 className="font-bold">Sobre a viagem</h2>
        <p>{travel?.description}</p>
        <div className="flex items-center justify-start w-full gap-5">
          <h2 className="font-bold">Avaliações {`(${3})`}</h2>
          <StarRating rating={travel?.rating || 0} />
        </div>
        <ScrollContainer className="flex flex-col gap-3 w-full">
          {reviewsComponentMock.map((review) => (
            <ReviewComponent
              key={review.userName}
              rating={review.rating}
              review={review.review}
              userImage={review.userImage}
              userName={review.userName}
            />
          ))}
        </ScrollContainer>
      </Card>
      <FooterBooking onClick={() => {}} price={travel?.price || 0} />
    </div>
  );
};

export default Trip;
