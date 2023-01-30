import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage'
import Register from './pages/auth/Register';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import TransactionGroupDetail from './pages/TransactionGroupDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Routes >
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/profile' element={<ProfilePage />} />
                <Route exact path='/change-password' element={<ChangePasswordPage />} />
                <Route exact path='/transaction-group-detail' element={<TransactionGroupDetail />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App;
