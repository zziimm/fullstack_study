import { useState } from "react";

const style = {
  popup: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'gray'

  }
}

function Popup(props) {
  return (
    <div style={style.popup}>
      {props.profile.userName}
    </div>
  );
}

function User(props) {
  const [UserInfo, setUserInfo] = useState(false);
  const handleInfo = () => {
    setUserInfo(UserInfo => !UserInfo)
  };

  return (
    <>
      {UserInfo && <Popup />}

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