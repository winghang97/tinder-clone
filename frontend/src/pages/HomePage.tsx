import { useEffect, useState } from "react";
import Card from "../components/Card";
import { People } from "../types";
import api from "../lib/api";
import { Spinner } from "react-bootstrap";

type Props = {
  gender: string;
};
const HomePage = ({ gender }: Props) => {
  const [people, setPeople] = useState<People[]>();
  console.log(gender);

  useEffect(() => {
    const getPeople = async () => {
      const res = await api.get(`/users?gender=${gender}`);
      const data = res.data;
      setPeople(data);
    };

    getPeople();
  }, [gender]);

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
