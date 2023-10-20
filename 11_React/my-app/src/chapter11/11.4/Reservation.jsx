import { useState } from "react";

function Reservation() {
  // 여러 개의 입력 제어하기 => 여러 개의 state 선언
  const [breakfast, setBreakfast] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [cars, setCars] = useState(false);
  const [roomType, setRoomType] = useState('SINGLE');
  const [textBox, setTextBox] = useState('요청사항');

  const handleBreakfastChange = (e) => {
    setBreakfast(e.target.checked);
  };

  const handleGuestsChange = (e) => {
    setNumberOfGuests(e.target.value);
  };

  const handleCars = (e) => {
    setCars(e.target.checked);
  };

  const handleRoomChange = (e) => {
    setRoomType(e.target.value)
  };

  const handleTextBox = (e) => {
    setTextBox(e.target.value)
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `조식 여부: ${breakfast ? '먹는다' : '안먹는다'}, 
      투숙객 수: ${numberOfGuests}, 
      주차 여부: ${cars  ? '차량이용' : '도보'}, 
      룸 타입: ${roomType},
      전달 사항: ${textBox}`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        조식 여부:
        <input 
        type="checkbox" 
        // checked 속성은 checkbox랑 radio 타입에 존재하고 boolean 타입의 값
        checked={breakfast}
        onChange={handleBreakfastChange}
        />
      </label>
      <br />
      <label>
        투숙객 수:
        <input 
        type="number" 
        value={numberOfGuests}
        onChange={handleGuestsChange}
        />
      </label>

      <br />

      <label>
        주차 여부:
        <input 
        type="checkbox"
        checked={cars}
        onChange={handleCars}
        />
      </label>

      <br />

      룸 타입:
      <label>
        <input 
        type="radio" 
        name='roomType'
        value="SINGLE"
        checked={roomType === 'SINGLE'}
        onChange={handleRoomChange}
        />
        싱글
      </label>
      <label>
        <input 
        type="radio" 
        name='roomType'
        value="DOUBLE"
        checked={roomType === 'DOUBLE'}
        onChange={handleRoomChange}
        />
        더블
      </label>
      <label>
        <input 
        type="radio" 
        name='roomType'
        value="TIWIN"
        checked={roomType === 'TIWIN'}
        onChange={handleRoomChange}
        />
        트윈
      </label>

      <br />
      <label>
        전달 사항:
        <textarea 
        value={textBox}
        onChange={handleTextBox}
        />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}

export default Reservation;