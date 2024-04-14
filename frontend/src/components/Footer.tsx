import TinderLogo from "../assets/tinder_logo.png";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <button className="btn">
          <a href="/">
            <img className="tinder-footer-logo" src={TinderLogo} />
          </a>
        </button>
        <button className="btn">
          <a href="#" className="text-secondary">
            <FontAwesomeIcon icon={faComment} size="lg" />
          </a>
        </button>
        <button className="btn">
          <a href="/profile" className="text-secondary">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default Footer;
