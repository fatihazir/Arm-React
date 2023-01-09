function NotLoggedIn() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>

            <div class="alert alert-warning" style={{ fontSize: 40 }}>
                <strong >Warning!</strong> You are not logged in to see this content.
            </div>
            <button onClick={() => window.location.href = '/login'} style={{ width: '20vw' }} type="button" class="btn btn-primary btn-block">Login</button>

        </div>
    )
}

export default NotLoggedIn