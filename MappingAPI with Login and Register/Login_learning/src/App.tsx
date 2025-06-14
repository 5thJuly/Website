import LoginForm from './components/login/LoginForm';
import SignupForm  from './components/login/SignUpForm';
import './App.css';
import {useState} from "react";

function App() {
    const [currentForm, setCurrentForm] = useState<'login' | 'signup'>('login');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const switchForm = (newForm: 'login' | 'signup') => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentForm(newForm);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 300);
    };

    return (
        <div className="App relative overflow-hidden">
            <div
                className={`transition-all duration-500 ease-in-out transform ${
                    isTransitioning
                        ? 'opacity-0 scale-95 translate-y-4'
                        : 'opacity-100 scale-100 translate-y-0'
                }`}
            >
                {currentForm === 'login' ? (
                    <LoginForm onSwitchToSignup={() => switchForm('signup')} />
                ) : (
                    <SignupForm onSwitchToLogin={() => switchForm('login')} />
                )}
            </div>
        </div>
    );
}

export default App;