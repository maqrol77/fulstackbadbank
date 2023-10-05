function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <img src='./logo.png' width="50 px" height="50 px" alt="Bank logo" />
      <a className="navbar-brand badbank-link" href="#" style={{ fontSize: '36px' }}>BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto" style={{ width: "fit-content" }}>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title="Creating New Account Page" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title="User Login Page" href="#/login/">Login</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title="Deposit Page" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title="Withdraw Page" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title="Balance Checking" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link bold-nav-link" data-toggle="tooltip" title=" All user data" href="#/alldata/">AllData</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
