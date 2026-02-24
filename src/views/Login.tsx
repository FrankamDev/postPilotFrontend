export default function Login() {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login");
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit} action="">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" placeholder="Mot de passe" />
            
          </div>
        </form>
      </div>
    </div>
  );
}
