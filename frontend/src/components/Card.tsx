import { createRef, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import { People } from "../types";
import {
  faCircle,
  faRotateLeft,
  faXmark,
  faStar,
  faHeart,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../lib/api";

declare type Direction = "left" | "right" | "up" | "down";

type Props = {
  people: People[];
};

const Card = ({ people }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(people.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(people.length)
        .fill(0)
        .map((_, i) => ({
          ref: createRef<any>(),
          id: people[i].id, // Saving the ID here
        })),
    [people]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = people && currentIndex < people.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (direction: Direction, id: number, index: number) => {
    await api.post("/likes/create", {
      userId: id,
      like: direction == "left" ? false : true,
    });
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].ref.current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex <= people.length) {
      await childRefs[currentIndex].ref.current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;

    const newIndex = currentIndex + 1;
    const res = await api.delete(`/likes/delete/${childRefs[newIndex].id}`);
    const data = res.data;
    if (data.success) {
      updateCurrentIndex(newIndex);
      await childRefs[newIndex].ref.current.restoreCard();
    }
  };

  return (
    <>
      {currentIndexRef.current > 0 ? (
        <div className="d-flex justify-content-center margin-top-vh">
          <div className="cardContainer ">
            {people &&
              people.map((p, i) => (
                <TinderCard
                  ref={childRefs[i].ref}
                  className="swipe"
                  key={p.id}
                  preventSwipe={["up", "down"]}
                  onSwipe={(direction) => swiped(direction, p.id, i)}
                  onCardLeftScreen={() => outOfFrame(p.firstName, i)}
                >
                  <div
                    style={{ backgroundImage: "url(" + p.image + ")" }}
                    className="card"
                  >
                    <h3>{p.firstName}</h3>
                  </div>
                </TinderCard>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center margin-top-vh">Out of swipes</div>
      )}

      <div className="swipeButton">
        <button className="btn" onClick={() => goBack()}>
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
        </button>
        <button className="btn" onClick={() => swipe("left")}>
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
        </button>
        <button className="btn">
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
        </button>
        <button className="btn" onClick={() => swipe("right")}>
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
        </button>
        <button className="btn">
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
        </button>
      </div>
    </>
  );
};

export default Card;
