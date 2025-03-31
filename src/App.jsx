import { Link } from "react-router-dom";
function App() {
    return (
        <main>
            <h1>List of React Machine Coding:</h1>
            <nav>
                <ol>
                    <li><Link to='/country-matching-game'>Country Mathcing Game</Link></li>
                    <li><Link to='/otp-verification'>OTP Verification</Link></li>
                    <li><Link to='/progress-bars'>Progress Bars</Link></li>
                    <li><Link to='/file-explorer'>File Explorer</Link></li>
                </ol>
            </nav>
        </main>
    )
}
export default App