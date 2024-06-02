import React, {useState, useEffect, useRef} from "react";

function PomodoroTimer(){
    let startPause = document.getElementById('start-stop')
    const breakSession = document.getElementById('timer-label')
    const audioFile = document.getElementById('beep')
    const defaultBreakTime = 5 * 60;
    const defaultSessionTime = 25 * 60;
    const minTime = 60;
    const maxTime = 60 * 60;
    
    let [breakTime, setBreakTime] = useState(defaultBreakTime);
    let [sessionTime, setSessionTime] = useState(defaultSessionTime)
    const [isRunning, setIsRunning] = useState(false)
    let [isBreakTime, setIsBeakTime] = useState(false)
    let [timeTotal, setTimeTotal] = useState(isBreakTime ? defaultBreakTime : defaultSessionTime)
    const startTimeRef = useRef()
    const timeoutRef = useRef()    
    
    useEffect(() => {
        let startPause = document.getElementById('start-stop')
        if(isRunning && timeTotal >= 0){
            startTimeRef.current = setInterval(()=>{
                setTimeTotal(timeTotal--)
                if (timeTotal == 0){
                    setIsBeakTime(breakTime => !breakTime)
                    // if(breakTime){
                    //     setTimeTotal(breakTime)
                    //     console.log(isBreakTime)
                    // }
                    timeoutRef.current = setTimeTotal(isBreakTime ? sessionTime : breakTime)
                    audioFile.play()
                    setTimeout(()=>{audioFile.pause()}, 6900)
                    clearTimeout(timeoutRef.current)
                    if(isBreakTime && timeTotal == 0){
                        setTimeTotal(sessionTime)
                        setIsRunning(false)
                        startPause.innerText = 'Start'
                        clearInterval(startTimeRef.current)
                    }
                    clearInterval(startTimeRef.current)
                       
                } 
            }, 1000)
        return () => {
            clearInterval(startTimeRef.current)
        };
    }}, [isRunning, isBreakTime])
    
    function adjustSessionTime(cond){
        if (cond === '+' && sessionTime < maxTime){
            setSessionTime(sessionTime += (60))
        } else if (cond === '-' && sessionTime > minTime){
            setSessionTime(sessionTime -= 60)
        }
        isBreakTime ? setTimeTotal(breakTime) : setTimeTotal(sessionTime)
    };
    
    function adjustBreakTime(cond){
        if (cond === '+' && breakTime < maxTime){
            setBreakTime(breakTime += (60))
        } else if (cond === '-' && breakTime > minTime){
            setBreakTime(breakTime -= 60)
        }
        isBreakTime ? setTimeTotal(breakTime) : setTimeTotal(sessionTime)
    };      
    

    function start(cond){
        console.log(cond)
        let startPause = document.getElementById('start-stop')
        const breakSession = document.getElementById('break-or-session')
        if (cond === 'Start' && timeTotal > 0){
            setIsRunning(true)
            console.log(isRunning)
            startPause.innerText = 'Pause'
            audioFile.pause()
            audioFile.currentTime = 0.2
        } 
        if (cond === 'Pause'){
            setIsRunning(false)
            console.log(isRunning)
            startPause.innerText = 'Start'
        }
    };

    function reset(){
        let startPause = document.getElementById('start-stop')
        setIsRunning(false);
        setBreakTime(false)
        setSessionTime(defaultSessionTime);
        setTimeTotal(defaultSessionTime)
        setBreakTime(defaultBreakTime);
        startPause.innerText = 'Start'
        breakSession.innerText = 'Session'
        audioFile.pause()
        audioFile.currentTime = 0
    };
       

    return(        
        <div id='main-container'>
            <div id='break-session-container'>
                <div id='break-label'>
                    <p>Break Length</p>
                    <button onClick={()=>{adjustBreakTime('+')}} id='break-increment'>+</button>
                    <p id='break-length'>{breakTime / 60}</p>
                    <button onClick={()=>{adjustBreakTime('-')}} id='break-decrement'>-</button>
                </div>
                <div id='session'>
                    <p id='timer-label'>{isBreakTime ? 'Break' : 'Session'}</p>
                    <p id='time-left'>{Math.floor(timeTotal / 60 % 60) < 10 ? '0' + Math.floor(timeTotal / 60 % 60) : Math.floor(timeTotal / 60 % 60)}:{Math.floor(timeTotal % 60) < 10 ? '0' + Math.floor(timeTotal % 60) : Math.floor(timeTotal % 60)}</p>
                </div>
                <div id='session-label'>
                    <p>Session Length</p>
                    <button onClick={()=>{adjustSessionTime('+')}} id='session-increment'>+</button>
                    <p id='session-length'>{sessionTime / 60}</p>
                    <button onClick={()=>{adjustSessionTime('-')}} id='session-decrement'>-</button>
                </div>
            </div>
            <div id='start_stop'>
                <button id='start-stop' onClick={()=>{start(startPause.innerText)}}>Start</button>
                <audio src='/Barracks.mp3' id='beep'></audio>
                <button id='reset' onClick={reset}>Reset</button>
            </div>

        </div>
    )
}

export default PomodoroTimer 