import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
