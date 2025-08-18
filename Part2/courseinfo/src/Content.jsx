import { Part } from "./Part";

export const Content = ({ parts }) => {
  return parts.map((part) => (
    <div key={part.id}>
      {part.name} {part.exercises}
    </div>
  ));
};
