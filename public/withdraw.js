function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        bgcolor="light"
        txtcolor="black"
        header="Withdraw"
        headercolor="#ffffff"
        headerBackground="#21835E"
        status={status}
        body={show ?
          <WithdrawForm setShow={setShow} setStatus={setStatus} /> :
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />}
      />
    </div>
  )
}

function WithdrawMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Withdraw again
    </button>
  </>);
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');  // 1. Add state variable for the error message

  function handle() {

    if (email === '') {
      setErrorMessage('Email is required!');
      return;
    }

    if (amount <= 0) {
      setErrorMessage('Please provide a valid positive number greater than 0');
      return;
    } else if (isNaN(amount)) {
      setErrorMessage('Provided amount is NOT A NUMBER!');
      return;
    }

    // First, fetch the current balance for the given email
    fetch(`/account/findOne/${email}`)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.email) { // Check if data exists and has an email attribute
          setErrorMessage('Provided email does not exist. Please check and try again.');
          return;
        }

        if (data.balance < amount) {
          setErrorMessage('Your withdraw is bigger than your balance! Please check your account balance.');
          return;
        }

        // Reset the error message if any
        setErrorMessage('');
        // Proceed with the withdrawal
        fetch(`/account/update/${email}/-${amount}`)
          .then(response => response.text())
          .then(text => {
            try {
              const data = JSON.parse(text);
              props.setShow(false);
            } catch (err) {
              props.setStatus('Withdraw failed');
            }
          });
      })
      .catch(() => {
        // This catch block will handle errors in the fetch call itself (like network errors)
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

      Amount<br />
      <input type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)} /><br />

      {/* 3. Display the error message */}
      {errorMessage && <div style={{ color: 'red', margin: '10px' }}>{errorMessage}</div>}

      <button type="submit"
        className="btn btn-primary shadow"
        disabled={!amount}
        onClick={handle}>
        Withdraw
      </button>
    </>
  );
}
