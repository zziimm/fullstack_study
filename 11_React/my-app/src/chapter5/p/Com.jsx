import User from "./User";

function Com(props) {
  return (
    <>
      <User profile = {props.profile}/>

      <div className="comments">
        {props.text}
      </div>

      <div className="date">
        {props.date}
      </div>
    </>
  );
}

export default Com;