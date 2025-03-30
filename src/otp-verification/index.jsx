import { useRef, useState } from "react";
import '../App.css'
function OTPVerification({ otpLength = 5 }) {
    const [inputArray, setInputArray] = useState(new Array(otpLength).fill(''));
    const refInputs = useRef([]);
    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        const newInputArray = [...inputArray];
        newInputArray[index] = value.slice(-1);
        setInputArray(newInputArray);
        if (value.trim() !== "")
            refInputs.current[index + 1]?.focus();
    };
    const handleClearOtpDigit = (e, index) => {
        if (e.key === 'Backspace') {
            refInputs.current[index - 1]?.focus();
        }
    }
    return (
        <section className="otp-verification">
            {
                inputArray.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        ref={input => refInputs.current[index] = input}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyUp={(e) => handleClearOtpDigit(e, index)}
                    />
                ))
            }
        </section>
    );
}

export default OTPVerification;