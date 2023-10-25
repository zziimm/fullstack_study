import React from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const TodoListWrapper = styled.div`
  /* 최소, 최대 높이 설정 */
  min-height: 300px;
  max-height: 513px;
  /* 최대 높이 도달 시 넘치면 스크롤 생성한다는 뜻 auto */
  overflow-y: auto;
`;

// todos 배열을 props로 받아와서 map() 함수를 사용해 여러 개의 TodoListItem 컴포넌트로 변환해 보여줌
function TodoList(props) {
  const { todos, onRemove } = props;

  return (
    <TodoListWrapper>
      {/* <TodoListItem />
      <TodoListItem />
      <TodoListItem /> */}

      {/* Quiz: map()함수를 이용하여 TodoListItem으로 이루어진 배열로 변환하여 반복 렌더링 */}
      {todos.map((todos)=>{
        // return <TodoListItem key={todos.id} text={todos.text} checkBox={todos.checked} onRemove={onRemove}/>
        // key 값은 props로 쓰면 안된다.
        return <TodoListItem todos={todos} onRemove={onRemove} />  // 객체 데이터를 한번에 전달해도 됨
      })}
    </TodoListWrapper>
  );
}

export default TodoList;