import { useEffect, useRef, useState } from "react"

export const MainWindow = () => {
    const containerRef = useRef(null);
    const [messages, setMessages] = useState(["Test", "Test", "Test"]);
    const [currentArea, setCurrentArea] = useState({})

    useEffect(() => {
        const body = {
            x: 0,
            y: 0,
            z: 0
        }
        // getArea(body)
    }, [])

    useEffect(() => {
        // Scroll to the bottom when messages update
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]); // Runs whenever messages change

    useEffect(() => {

    })

    return (
        <div 
            id="main-window"
            style={{
                display: "flex", 
                flexDirection: "column", 
                overflow: "auto", 
                border: "4px solid brown", 
                height: "700px",
                alignItems: "flex-start"
            }}>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
        </div>
    )
}