function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        bgcolor="light"
        txtcolor="black"
        header="Deposit"
        headercolor="#ffffff"
        headerBackground="#92695D"
        status={status}
        body={show ?
          <DepositForm setShow={setShow} setStatus={setStatus} /> :
          <DepositMsg setShow={setShow} setStatus={setStatus} />}
      />
    </div>
  );
}


function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      New Deposit
    </button>
  </>);
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');  // Step 1: Add state variable for error message

  function handle() {

    if (email === '') {
      setErrorMessage('Email is required!'); // Use setErrorMessage instead of alert
      return;
    }

    if (amount <= 0) {
      setErrorMessage('Please provide valid positive number greater than 0');
      return;
    } else if (isNaN(amount)) {
      setErrorMessage('Provided amount is NOT A NUMBER!');
      return;
    }

    // First, fetch the current balance for the given email to check if the email exists
    fetch(`/account/findOne/${email}`)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.email) {
          setErrorMessage('Wrong email. Please check and try again.'); // Step 2: Set error message
          return;
        }

        // If the email exists, proceed with the deposit
        return fetch(`/account/update/${email}/${amount}`)
          .then(response => response.text())
          .then(text => {
            try {
              const data = JSON.parse(text);
              props.setShow(false);
              setErrorMessage(''); // Reset the error message
              console.log('JSON:', data);
            } catch (err) {
              props.setStatus('Deposit failed');
              console.log('err:', text);
            }
          });
      })
      .catch(() => {
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

      {/* Step 3: Display the error message */}
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

      <button type="submit"
        className="btn btn-primary shadow"
        disabled={!amount}
        onClick={handle}>Deposit</button>
    </>
  );
}
