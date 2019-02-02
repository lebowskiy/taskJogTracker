import React from 'react';
import iconJog from '../../images/jog/icon.png';
const formatDate = (dt) => {
  const str0l = (val, len) => {
    var strVal = val.toString();
    while (strVal.length < len)
      strVal = '0' + strVal;
    return strVal;
  }
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year;
}
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