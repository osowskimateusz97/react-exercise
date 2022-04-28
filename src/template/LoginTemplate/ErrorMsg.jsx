const ErrorMsg = ({ error, className }) => (
  <div className={className}>
    {error.map((msg) => (
      <p data-testid='errorMsg' key={msg}>
        {msg}
      </p>
    ))}
  </div>
);
export default ErrorMsg;
