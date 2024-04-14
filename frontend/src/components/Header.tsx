import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { Form, Offcanvas } from "react-bootstrap";

import TinderLogo from "../assets/tinder.png";

type Props = {
  getGender: (gender: string) => void;
  gender: string;
};

const Header = ({ getGender, gender }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <img className="tinder-logo me-auto" src={TinderLogo} />
      <button className="btn" onClick={handleShow}>
        <FontAwesomeIcon icon={faSliders} size="lg" />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Discovery Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Group className="mb-3">
            <Form.Label>Show me</Form.Label>
            <Form.Select
              value={gender}
              onChange={({ target }) => getGender(target.value)}
            >
              <option value="">Everyone</option>
              <option value="male">Men</option>
              <option value="female">Women</option>
            </Form.Select>
          </Form.Group>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Header;
