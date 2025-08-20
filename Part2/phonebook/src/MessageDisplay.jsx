export const MessageDisplay = ({ message }) => {
  return message.message !== null ? (
    <div className={message.type}>{message.message}</div>
  ) : null;
};
