function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        txtcolor="black"
        header="BadBank Landing Page"
        headercolor="white"
        headerBackground="#6f9bce"
        title="Welcome to Bad Bank!"
        text="You can't trust in this bank."
        body={<img src="./Bank.png" style={{ width: '250px', height: '300px' }} alt="Responsive image" />}
      />
    </div>
  );
}

