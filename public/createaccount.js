function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');  // <-- Mutable status state

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        bgcolor="light"
        txtcolor="black"
        header="Create Account"
        headercolor="#ffffff"
        headerBackground="#1b2a41"
        status={status}
        body={show ?
          <CreateForm setShow={setShow} setStatus={setStatus} /> :  // <-- Passing setStatus prop
          <CreateMsg setShow={setShow} />}
      />
    </div >
  );
}

function CreateMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary"
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    console.log(name, email, password);
    if (name == null || name == "") {
      alert('Name is required. Please enter name');
      setName('');
      return;
    }
    if (email == null || email == "") {
      alert('Email is required. Please enter email');
      setEmail('');
      return;
    }
    if (password.length < 8) {
      alert('Password is less than 8 characters. !');
      setPassword('');
      return;
    }
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);

      // Set the success message with the user's name
      props.setStatus(
        <div style={{ fontSize: '24px', margin: '20px 0' }}>
          {"Welcome "} <span style={{ fontWeight: 'bold' }}>{name + "!"}</span>
        </div>
      );



      props.setShow(false);
    })();
  }

  return (<>

    Name<br />
    <input type="input"
      className="form-control"
      placeholder="Enter name"
      value={name}
      onChange={e => setName(e.currentTarget.value)} /><br />

    Email address<br />
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

    <button type="submit"
      className="btn btn-primary shadow"
      disabled={!password}
      onClick={handle}>Create Account</button>

  </>);
}