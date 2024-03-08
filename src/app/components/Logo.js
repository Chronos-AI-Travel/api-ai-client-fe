import { faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Tabs = () => {
  return (
    <div className="flex items-center flex-row gap-2 mb-4 text-2xl font-medium">
      <div>
        Travellator 7000
      </div>
      <Image height={50} width={50} alt="logo" src="/Logo.webp" />
    </div>
  );
};
export default Tabs;
