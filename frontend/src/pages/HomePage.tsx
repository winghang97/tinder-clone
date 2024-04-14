import { useEffect, useState } from "react";
import Card from "../components/Card";
import { People } from "../types";
import api from "../lib/api";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
  gender: string;
  token: string;
};
const HomePage = ({ gender, token }: Props) => {
  const nav = useNavigate();

  const [people, setPeople] = useState<People[]>();

  useEffect(() => {
    if (!token) {
      nav("/login");
    }

    const getPeople = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await api.get(`/users?gender=${gender}`, config);
      const data = res.data;
      setPeople(data);
    };

    getPeople();
  }, [gender, token]);

  return (
    <div>
      {people ? (
        <Card people={people} />
      ) : (
        <div className="text-center margin-top-vh">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default HomePage;
