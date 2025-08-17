export const Button = ({ text, clickHandler }) => {
  console.log(text, clickHandler);
  return (
    <button id={text} onClick={clickHandler}>
      {text}
    </button>
  );
};
