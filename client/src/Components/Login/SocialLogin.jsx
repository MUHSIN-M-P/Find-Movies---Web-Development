const SocialLogin = () => {
  return (
    <div className="social-login">
      <button
        className="social-button"
        onClick={() => {
          window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend
        }}
      >
        <img src="google.svg" alt="Google" className="social-icon" />
        Google
      </button>
      <button className="social-button">
        <img src="apple.svg" alt="Apple" className="social-icon" />
        Apple
      </button>
    </div>
  );
};

export default SocialLogin;
