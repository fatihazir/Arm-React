function NotLoggedIn() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>

            <div class="alert alert-warning" style={{ fontSize: 16, }}>
                <strong >Warning!</strong> You are not logged in to see this content.
            </div>
            <button onClick={() => window.location.href = '/login'} style={{ width: '20vw' }} type="button" class="btn btn-primary btn-block">Login</button>
            <button onClick={() => window.location.href = '/register'} style={{ width: '15vw', marginTop: 12 }} type="button" class="btn btn-warning btn-block">Register</button>

        </div>
    )
}

export default NotLoggedIn