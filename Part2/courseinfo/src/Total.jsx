export default function Total({ parts }) {
  const total = parts.reduce((total, current) => {
    return total + current.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
}
