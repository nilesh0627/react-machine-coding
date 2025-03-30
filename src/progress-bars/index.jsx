import { useRef, useState } from "react";
import '../App.css'

function ProgressBars({ timer = 2000 }) {
    const [bars, setBars] = useState([]);
    const divRefs = useRef([])

    const addBar = () => {
        const newBarIndex = bars.length;
        setBars((prevBars) => {
            const updatedBars = [...prevBars, newBarIndex];
            setTimeout(() => {
                divRefs.current[newBarIndex]?.classList.add('bar-filled');
            }, 0);
            return updatedBars;
        })
    }

    const clearBar = () => {
        divRefs.current.forEach((div) => {
            div.classList.remove('bar-filled');
            div.style.width = '0%';
        })
    }

    return (
        <section className="progress-bars">
            <button onClick={addBar}>Add</button>
            <button onClick={clearBar}>Clear</button>
            {bars.map((item, index) => <div key={index} className="bar-container">
                <div ref={div => divRefs.current[index] = div} className="bar-contents"></div>
            </div>)
            }
        </section >
    )
}

export default ProgressBars;