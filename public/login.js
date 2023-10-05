function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        bgcolor="light"
        txtcolor="black"
        header="Login"
        headercolor="#ffffff"
        headerBackground="#634785"
        status={status}
        body={show ?
          <LoginForm setShow={setShow} setStatus={setStatus} /> :
          <LoginMsg setShow={setShow} setStatus={setStatus} />}
      />
    </div>
  );
}

function LoginMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary shadow"
      onClick={() => props.setShow(true)}>
      New Login
    </button>
  </>);
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogout() {
    props.setStatus("User logged out!");

  }

  function handle() {

    if (email == '') {
      alert('email is required .!')
    }

    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          //props.setStatus("Welcome ");
          const name = Object.values(data);
          console.log(name[2]);
          props.setStatus(<div style={{ fontSize: '24px', margin: '20px 0' }}>
            {"Welcome "} <span style={{ fontWeight: 'bold' }}> {name[1] + "!"}</span>
          </div>);
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus('Wrong email or password!')
          //props.setShow(false);
          console.log('err:', text);
        }
      });
  }


  return (<>

    Email<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br />

    Password<br />
    <input type="password"
      className="form-control"
      placeholder="Enter password"
      value={password}
      onChange={e => setPassword(e.currentTarget.value)} /><br />

    <button type="submit" className="btn btn-primary mr-2 shadow" disabled={!password} onClick={handle}>Login</button>
    <button type="submit" className="btn btn-primary shadow" onClick={handleLogout}>Logout</button>

  </>);
}