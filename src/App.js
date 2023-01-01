import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import HomePage from './pages/HomePage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import Register from './pages/auth/Register';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import TransactionGroupDetail from './pages/TransactionGroupDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';

function App() {
    return (
        <Router>
            <Routes >
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/counter' element={<Counter />} />
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/profile' element={<ProfilePage />} />
                <Route exact path='/change-password' element={<ChangePasswordPage />} />
                <Route exact path='/preferences' element={<UserPreferencesPage />} />
                <Route exact path='/typography' element={<TypographyPage />} />
                <Route exact path='/transaction-group-detail' element={<TransactionGroupDetail />} />
            </Routes>
        </Router>
    )
}

export default App;
