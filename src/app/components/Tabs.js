import {
  faCar,
  faHotel,
  faPlane,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex cursor-pointer items-end  ml-4 font-light">
      <div
        className={`flex text-slate-800 items-center py-2 px-4 gap-2 ${
          activeTab === "Flights"
            ? "text-white bg-slate-800 border-t-2 border-r-2 border-l-2 rounded-t-lg"
            : "hover:bg-slate-200 rounded-t-lg"
        }`}
        onClick={() => setActiveTab("Flights")}
      >
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
      </div>
      <div
        className={`flex items-center py-2 px-4 gap-2 text-slate-800 ${
          activeTab === "Car Rental"
            ? "text-white bg-slate-800 border-t-2 border-r-2 border-l-2 rounded-t-lg"
            : "hover:bg-slate-200 rounded-t-lg"
        }`}
        onClick={() => setActiveTab("Car Rental")}
      >
        <FontAwesomeIcon icon={faCar} />
        <span>Car Rental</span>
      </div>
      <div
        className={`flex items-center py-2 px-4 gap-2 text-slate-800 ${
          activeTab === "Rail"
            ? "text-white bg-slate-800 border-t-2 border-r-2 border-l-2 rounded-t-lg"
            : "hover:bg-slate-200 rounded-t-lg"
        }`}
        onClick={() => setActiveTab("Rail")}
      >
        <FontAwesomeIcon icon={faTrain} />
        <span>Rail</span>
      </div>
      <div
        className={`flex items-center py-2 px-4 gap-2 text-slate-800 ${
          activeTab === "Hotel"
            ? "text-white bg-slate-800 border-t-2 border-r-2 border-l-2 rounded-t-lg"
            : "hover:bg-slate-200 rounded-t-lg"
        }`}
        onClick={() => setActiveTab("Hotel")}
      >
        <FontAwesomeIcon icon={faHotel} />
        <span>Hotel</span>
      </div>
    </div>
  );
};
export default Tabs;
