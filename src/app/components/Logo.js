import { faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logo = () => {
  return (
    <div className="flex items-center gap-4 text-2xl font-bold">
      <FontAwesomeIcon className="h-8" icon={faPlaneCircleCheck} />
      <div>Flight Search</div>
    </div>
  );
};
export default Logo;
