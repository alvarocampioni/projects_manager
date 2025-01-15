import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { editProject } from './services/ProjectService';

function DisplayTimer() {
  const { restTime, workTime } = useContext(AppContext);
  const { currentTime, setCurrentTime } = useContext(AppContext);
  const [isPaused, setIsPaused] = useState(true);
  const { isWork, setIsWork } = useContext(AppContext);
  const [updated, setUpdated] = useState(false);
  const { projectSelected, token } = useContext(AppContext);
  const { timeCounter, setTimeCounter } = useContext(AppContext);

  useEffect(() => {
    if (isPaused) return;
    const timerInterval = setInterval(() => {
      setCurrentTime(prevCurrentTime => {
        if (prevCurrentTime <= 0) {
          setUpdated(!updated);
        }
        return prevCurrentTime - 1;
      });
      if(isWork && projectSelected != null) setTimeCounter(prevTimeCounter => prevTimeCounter + 1);
    }, 1000);
    return () => clearInterval(timerInterval); 
  }, [isPaused]);

  const toggleUpdateTime = async () => {
    projectSelected.hours_spent = projectSelected.hours_spent + (timeCounter/3600);
    await editProject(projectSelected.project_id, projectSelected, token);
    setTimeCounter(0);
  }

  console.log(timeCounter);

  if(timeCounter >= 60){
    toggleUpdateTime();
  }

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  if(updated){
    setCurrentTime(isWork ? restTime : workTime);
    setIsWork(!isWork);
    setUpdated(!updated);
  }

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleRestart = () => {
    if(isWork) setCurrentTime(workTime);
    else setTime(restTime);
    setIsPaused(true);
  }

  const toggleSkip = () => {
    if(isWork) setCurrentTime(restTime);
    else setCurrentTime(workTime);
    setIsPaused(true);
    setIsWork(!isWork);
  }

  return( 
    <div className='container'>
      <div className='text-center'>
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