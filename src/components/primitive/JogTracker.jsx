import React from 'react';
import iconJog from '../../images/jog/icon.png';
import { formatDate } from "../../utils";

const JogTracker = ({date, distance, id, time, user_id}) => {
  const classCss = 'JogTracker';
  return(
    <div className={classCss}>
    <img alt={'iconJog'} src={iconJog}/>
    <div className={classCss + '__values'}>
      <div>{formatDate(new Date(date))}</div>
      <div>Speed: <span>{Math.round(distance/(time/60))}</span></div>
      <div>Distance: <span>{distance}</span></div>
      <div>Time: <span>{time}</span></div>
    </div>
  </div>
  )
  
}
export default JogTracker