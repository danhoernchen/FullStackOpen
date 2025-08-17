export const Button = ({ text, clickHandler }) => {
  return (
    <button onClick={clickHandler} id={text}>
      {text}
    </button>
  );
};
