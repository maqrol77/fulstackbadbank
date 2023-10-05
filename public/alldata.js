function AllData() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });

    }, []);

    function JsonDataDisplay() {
        const DisplayData = data.map(
            (info) => {
                return (
                    <tr key={info.email}>
                        <td>{info.name}</td>
                        <td>{info.email}</td>
                        <td>{info.password}</td>
                        <td>{info.balance}</td>
                    </tr>
                )
            }
        )

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Add this div */}
                <img src="ID.png" alt="Description of image" style={{ marginRight: '20px', width: '300px' }} />
                <h1>Bad Bank User's Data</h1>
            </div>
            <JsonDataDisplay />
        </div>
    );
}
