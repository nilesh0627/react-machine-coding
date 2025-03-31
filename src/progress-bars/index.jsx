import { useState } from "react";
import "../App.css";

function ProgressBars({ timer = 2000 }) {
    const [bars, setBars] = useState([]);

    const addBar = () => {
        const newBar = { id: bars.length, progress: 0 };
        setBars((prevBars) => [...prevBars, newBar]);

        // Simulate progress
        setTimeout(() => {
            setBars((prevBars) =>
                prevBars.map((bar) =>
                    bar.id === newBar.id ? { ...bar, progress: 1 } : bar
                )
            );
        }, 0);
    };

    return (
        <section className="progress-bars">
            <button onClick={addBar}>Add</button>
            {bars.map((bar) => (
                <div key={bar.id} className="bar-container">
                    <div
                        className="bar-contents"
                        style={{
                            transform: `scaleX(${bar.progress})`,
                            transition: `transform ${timer}ms ease-in-out`,
                        }}
                    ></div>
                </div>
            ))}
        </section>
    );
}

export default ProgressBars;