import React,{useState} from 'react'
import style from "../Styles/wheelStyle.module.css"
import SpinWheel from './SpinWheel';
const Luckywheel = ({ userId, updateUserTokens }) => {
 
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState(null);

  const rewards = ["1000", "2000", "5000", "3000", "6000", "500","2500","4000"];
  const numSegments = rewards.length;
  const segmentAngle = 360 / numSegments;

  const spinWheel = () => {
    const randomRotation = Math.floor(Math.random() * 360) + 2880; // 5 full spins + random angle
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);

    // Wait for the spin to complete, then calculate the reward
    setTimeout(() => {
      const finalRotation = newRotation % 360;
      const winningIndex = Math.floor((360 - finalRotation) / segmentAngle) % numSegments;
      setReward(Number(rewards[winningIndex]));
    }, 5000); // Match CSS transition duration
  };

  return (
    <div className={style.container}>
      <div className={style.wheelContainer}>
        {/* Pointer at the top */}
        <div className={style.pointer}></div>
        
        {/* Wheel */}
        <div className={style.wheel} style={{ transform: `rotate(${rotation-90}deg)` }}>
          {rewards.map((prize, index) => {
          return(
            <>
               <div
              key={index}
              className={style.segment}
              style={{
                backgroundColor: ["red", "yellow", "green", "blue", "orange", "purple","lightBlue","violet"][index],
                transform: `rotate(${index * segmentAngle}deg)`,
              }}
            ><div className={style.text}>{prize}</div></div>
            </>
           
            
          )
          })}
        </div>
      </div>

      {/* Spin Button */}
      <button onClick={spinWheel} className={style.spinButton}>
        Spin
      </button>

      {/* Reward Display */}
      <div className={style.reward}>{reward && `Congratulation! You Won: ${reward} tokens`}</div>
      <SpinWheel userId={userId}  updateUserTokens={updateUserTokens} reward={reward} setReward={setReward} />
    </div>

  );
}

export default Luckywheel
