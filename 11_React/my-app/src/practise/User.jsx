import { useState } from "react";

const style = {
  popup: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'gray'
  },
  btn: {
    backgroundColor: 'green'
  }
}

function Popup(props) {
  const [closeBtn, setCloseBtn] = useState(false);
  const handleCloseBtn = () => {
    setCloseBtn(closeBtn = !closeBtn)
  };

  return (
    <>
      <div style={style.popup}>
        {props.user.userName}
        <br />
        {props.user.info}
        <button style={style.btn} onClick={handleCloseBtn}>닫기</button>
      </div>
    </>
  );
}

function User(props) {
  const [UserInfo, setUserInfo] = useState(false);
  const handleInfo = () => {
    setUserInfo(UserInfo => !UserInfo)
  };

  return (
    <>
      {UserInfo && <Popup user={{userName:'민지민', info:'설명설명'}}/>}
      
      <div className="userInfo">
        <img className="userImg" 
          src={props.profile.imgUrl} 
          alt={props.profile.userName}
          style={{width:50}}
        />
        <div className="userInfo-name">
          {props.profile.userName}
          <button onClick={handleInfo}>유저정보</button>
        </div>
      </div>
    </>
  );
}

export default User;