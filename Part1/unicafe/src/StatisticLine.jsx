import { Average } from "./Average";
import { Positive } from "./Positive";
import { Rating } from "./Rating";
export const StatisticLine = (props) => {
  console.log(props);
  if (props.type === "rating") {
    return <Rating name={props.name} total={props.total} />;
  } else if (props.type === "average") {
    return <Average ratings={props.ratings} />;
  } else if (props.type === "positive") {
    return <Positive ratings={props.ratings} />;
  }
};
