const ErrorMsg = ({ error, className }) => (
  <div className={className}>
    {error.map((msg) => (
      <p key={msg}>{msg}</p>
    ))}
  </div>
);
export default ErrorMsg;
