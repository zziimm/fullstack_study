function User(props) {
  return (
    <div className="userInfo">
      <img className="userImg" 
        src={props.profile.imgUrl} 
        alt={props.profile.userName}
      />
      <div className="userInfo-name">
        {props.profile.userName}
      </div>
    </div>
  );
}

export default User;