import {
  faBolt,
  faCircle,
  faHeart,
  faRotateLeft,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

const Action = (props: Props) => {
  return (
    <div className="swipeButton">
      <div className="fa-2x">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="text-secondary" />
          <FontAwesomeIcon
            icon={faRotateLeft}
            transform="shrink-6"
            style={{ color: "#A9A9A9" }}
          />
        </span>
      </div>
      <div className="fa-2x">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="text-secondary" />
          <FontAwesomeIcon
            icon={faXmark}
            transform="shrink-6"
            style={{ color: "#DC143C" }}
          />
        </span>
      </div>
      <div className="fa-2x">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="text-secondary" />
          <FontAwesomeIcon
            icon={faStar}
            transform="shrink-6"
            style={{ color: "#1E90FF" }}
          />
        </span>
      </div>
      <div className="fa-2x">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="text-secondary" />
          <FontAwesomeIcon
            icon={faHeart}
            transform="shrink-6"
            style={{ color: "#00FF00" }}
          />
        </span>
      </div>
      <div className="fa-2x">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="text-secondary" />
          <FontAwesomeIcon
            icon={faBolt}
            transform="shrink-6"
            style={{ color: "#9400D3" }}
          />
        </span>
      </div>
    </div>
  );
};

export default Action;
