import ErrorModal from '../components/ErrorModal';

function NotFound() {
    return (
        <div style={{
            flex: 1,
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            overflowY: 'hidden',
            overflowX: 'hidden',
            opacity: 0.5,
            backgroundColor: 'black',
            width: '100%',
            height: '150%',
            zIndex: 9
        }}>
            <ErrorModal
                show={true}
                body={"There is nothing to see here."}
                firstButtonOnPress={() => window.location.href = '/'}
                firstButtonText={"Go to home page"}
                title={"Not found"}
            />
        </div>
    )
}

export default NotFound