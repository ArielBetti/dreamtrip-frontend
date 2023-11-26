import React from "react";

import {
  AccessibilityIcon,
  BedDoubleIcon,
  BedIcon,
  BeefIcon,
  BusIcon,
  ChefHatIcon,
  CoffeeIcon,
  ConciergeBell,
  DribbbleIcon,
  FlowerIcon,
  HotelIcon,
  InfoIcon,
  MartiniIcon,
  MountainIcon,
  PalmtreeIcon,
  ParkingCircleIcon,
  PartyPopperIcon,
  PawPrintIcon,
  PlaneIcon,
  SandwichIcon,
  ShowerHeadIcon,
  ShrubIcon,
  SnowflakeIcon,
  SparklesIcon,
  SunIcon,
  TractorIcon,
  TreesIcon,
  TvIcon,
  UtensilsIcon,
  WavesIcon,
  WifiIcon,
} from "lucide-react";

interface IconMap {
  [key: string]: React.ReactNode;
}

interface IconComponentProps {
  name: string;
  className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ name, className }) => {
  const iconMap: IconMap = {
    plane: <PlaneIcon className={className} />,
    bus: <BusIcon className={className} />,
    hotel: <HotelIcon className={className} />,
    pet: <PawPrintIcon className={className} />,
    wifi: <WifiIcon className={className} />,
    shower: <ShowerHeadIcon className={className} />,
    concierge: <ConciergeBell className={className} />,
    television: <TvIcon className={className} />,
    kitchen: <ChefHatIcon className={className} />,
    airConditioner: <SnowflakeIcon className={className} />,
    bedDouble: <BedDoubleIcon className={className} />,
    bed: <BedIcon className={className} />,
    garden: <FlowerIcon className={className} />,
    cleaning: <SparklesIcon className={className} />,
    parking: <ParkingCircleIcon className={className} />,
    pool: <WavesIcon className={className} />,
    breakfast: <CoffeeIcon className={className} />,
    cutlery: <UtensilsIcon className={className} />,
    bar: <MartiniIcon className={className} />,
    accessibility: <AccessibilityIcon className={className} />,
    trees: <TreesIcon className={className} />,
    grill: <BeefIcon className={className} />,
    sports: <DribbbleIcon className={className} />,
    island: <PalmtreeIcon className={className} />,
    mountain: <MountainIcon className={className} />,
    florest: <ShrubIcon className={className} />,
    party: <PartyPopperIcon className={className} />,
    desert: <SunIcon className={className} />,
    tractor: <TractorIcon className={className} />,
    food: <SandwichIcon className={className} />,
  };

  const selectedIcon = iconMap[name];

  return selectedIcon ? selectedIcon : <InfoIcon className={className} />;
};

export default IconComponent;
