import { ITravelApresentation } from "@/interfaces/travel";

const travelDestinationsMock: ITravelApresentation[] = [
  {
    id: "1",
    name: "Praias Paradisíacas",
    description: "Desfrute de areias brancas e águas cristalinas.",
    location: {
      city: "Bora Bora",
      country: "Polinésia Francesa",
    },
    image: "https://picsum.photos/seed/picsum/200/300",
    category: [{ icon: "🏝️", label: "Praias" }],
    rating: 4.8,
    price: 2500,
    dateRange: {
      openDate: new Date("2023-05-01"),
      closeDate: new Date("2023-05-10"),
    },
    reservedDates: [],
    hasFavorited: false,
    notes: [],
    accommodation: [{ icon: "🏨", label: "Resort", active: true }],
    itinerary: [
      {
        activity: "Mergulho",
        date: new Date("2023-05-02"),
        time: "10:00 AM",
        notes: "Equipamento fornecido.",
      },
      {
        activity: "Passeio de barco",
        date: new Date("2023-05-04"),
        time: "02:00 PM",
        notes: "Não esqueça o protetor solar.",
      },
    ],
    gallery: ["img1.jpg", "img2.jpg", "img3.jpg"],
    vacanciesPerPeriod: 50,
  },
];

export default travelDestinationsMock;
