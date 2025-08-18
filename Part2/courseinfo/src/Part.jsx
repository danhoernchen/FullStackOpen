export const Part = ({ id, part, exercises }) => {
  return (
    <p key={id}>
      {part} {exercises}
    </p>
  );
};
