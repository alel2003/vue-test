export interface Label {
  id: number;
  type: "payment_plan" | "success_test" | "warranty";
}

export interface Characteristics {
  matrixType: string;
  screenDiagonal: string;
  screenResolution: string;
  internalMemory: string
  ramMemory: string
  pixelDensity: string;
  brightness: string;
  refreshRate: string;
  os: string;
  osVersion: string;
  memoryCardSlot: string;
  mainCameraResolution: string;
  secondaryCameraResolution: string;
  mainCameraAperture: string;
  secondaryCameraAperture: string;
  frontCameraResolution: string;
  frontCameraAperture: string;
  videoResolution: string;
  videoFramerate: string;
  battery: string;
  simFormat: string;
  cameraFeatures: string[];
}

export interface Installment {
  [provider: string]: {
    [months: string]: number;
  };
}

export interface Offer {
  title: string;
  type: "first" | "second" | string;
  price: number;
  salePrice: number;
  installment?: Installment;
}

export interface Variant {
  id: string;
  ram: number;
  storage: number;
  price: number;
  salePrice: number;
  stock: number;
  offers?: Offer[];
}

export interface Color {
  id: number;
  title: string;
  color: string;
  images: string[];
  variants: Variant[];
}

export interface Phone {
  slug: string;
  title: string;
  labels: Label[];
  characteristics?: Characteristics;
  colors: Color[];
}

export interface HeroMemoryProps {
  title: string;
  type: "ram" | "storage";
  options: number[];
  variants: Variant[];
}
