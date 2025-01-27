import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { editProject } from './services/ProjectService';

function DisplayTimer() {
  const { restTime, workTime } = useContext(AppContext);
  const { currentTime, setCurrentTime } = useContext(AppContext);
  const [isPaused, setIsPaused] = useState(true);
  const { isWork, setIsWork } = useContext(AppContext);
  const { projectSelected, token } = useContext(AppContext);
  const { timeCounter, setTimeCounter } = useContext(AppContext);
  const { cycles, setCycles } = useContext(AppContext);

  useEffect(() => {
    if (isPaused) return;

    const timerInterval = setInterval(() => {
      setCurrentTime((prevCurrentTime) => {
        if (prevCurrentTime <= 1) {
          setIsWork((prevIsWork) => {
            if (!prevIsWork) setCycles((prevCycles) => prevCycles + 1);
            return !prevIsWork;
          });

          return isWork ? restTime : workTime;
        }
        
        return prevCurrentTime - 1;
      });
      if (isWork && projectSelected != null) {
        setTimeCounter((prevTimeCounter) => prevTimeCounter + 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isPaused, isWork, restTime, workTime, projectSelected]);

  console.log(timeCounter);

  useEffect(() => {
    const updateTime = async () => {
      projectSelected.hours_spent += timeCounter / 3600;
      await editProject(projectSelected.project_id, projectSelected, token);
      setTimeCounter(0); 
    };

    if (timeCounter >= 60) {
      updateTime();
    }
  }, [timeCounter, projectSelected, token]);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  const togglePause = () => setIsPaused((prev) => !prev);

  const toggleRestart = () => {
    setCurrentTime(isWork ? workTime : restTime);
    setIsPaused(true);
  };

  const toggleSkip = () => {
    setCurrentTime(isWork ? restTime : workTime);
    setIsWork((prev) => !prev);
    setCycles((prevCycles) => prevCycles + 0.5);
    setIsPaused(true);
  };

  return( 
    <div className='container'>
      <div className='text-center'>
        <h1 style={{marginBottom: "10px"}}>Completed {Math.floor(cycles)} full Pomodoro Cycles</h1>
        <h1 className='text-center' style={{ color: isWork ? "red" : "blue" }}>{isWork ? "Work Time" : "Rest Time"}</h1>
        <h1 className='timer' style={{color: "black"}}>{`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</h1>
        <button type="button" className="running" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        <button type="button" className="restart" onClick={toggleRestart}>Restart</button>
        <button type="button" className="skip" onClick={toggleSkip}>Skip</button>
    </div>
  </div>
 )
}


export default DisplayTimer;