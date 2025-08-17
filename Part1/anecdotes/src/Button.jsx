export const Button = ({ text, clickHandler }) => {
  return (
    <button id={text} onClick={clickHandler}>
      {text}
    </button>
  );
};
