import { Part } from "./Part";

export const Content = ({ parts }) => {
  return parts.map((part) => (
    <p>
      {part.part} {part.exercises}
    </p>
  ));
};
