function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        bgcolor="light"
        txtcolor="black"
        header="Balance"
        headercolor="#ffffff"
        headerBackground="#AB3142"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus} /> :
          <BalanceMsg setShow={setShow} setStatus={setStatus} />}
      />
    </div>
  )

}

function BalanceMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Check balance again
    </button>
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(''); // 1. Add state variable for error message

  function handle() {
    if (email === '') {
      setErrorMessage('Email is required!');
      return;
    }

    fetch(`/account/findOne/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server responded with an error');
        }
        return response.text();
      })
      .then(text => {
        const data = JSON.parse(text);
        if (!data || !data.email) {
          setErrorMessage('The email provided does not exist in our system. Please check and try again.');
          return;
        }

        const balanceValues = Object.values(data);
        props.setStatus(
          <div style={{ fontSize: '24px', margin: '20px 0' }}>
            {"Your current balance is "} <span style={{ fontWeight: 'bold' }}>
              {"$" + balanceValues[4]}
            </span>
          </div>
        );
        props.setShow(false);
        console.log('JSON:', data);
      })
      .catch(error => {
        console.error('There was an error:', error.message);
        setErrorMessage('The email provided does not exist in our system. Please check and try again!');
      });
  }

  return (
    <>
      Email<br />
      <input type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} /><br />

      {/* Display the error message */}
      {errorMessage && <div style={{ color: 'red', margin: '10px' }}>{errorMessage}</div>}

      <button type="submit"
        className="btn btn-primary shadow"
        disabled={!email}
        onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
