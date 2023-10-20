// 출석부 컴포넌트
const students = [
  {
    id: '1',
    name: '김재현',
    email: 'geoblo@naver.com'
  },
  {
    id: '2',
    name: '유재석',
    email: 'you@example.com'
  },
  {
    id: '3',
    name: '이이경',
    email: '22kyung@example.com'
  },
  {
    id: '4',
    name: '이미주',
    email: 'joo@example.com'
  }
];

function AttendanceBook() {
  return (
    <ul>
      {students.map((list, index) => {
        return <li key={list.id}>{list.name} {list.email}</li>
      })}
    </ul>
  );
}

export default AttendanceBook;