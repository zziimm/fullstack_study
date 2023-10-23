import React from 'react';
import { useState } from 'react';
import PostDetail from './PostDetail';

function PostListItem() {
  // 서버에서 가져온 데이터라고 가정
  const [posts, setPosts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', '스타일링 가이드']);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeCount, setLikeCount] = useState([0, 0, 0]);
  const [plus, setPlus] = useState('');

  const [inputs, setInputs] = useState(
    [{
      id: 1,
      postss: '리액트 잘 쓰려면?',
      likeCountt: 0,
      date: new Date(),
      author: 'zim'
    },
    {
      id: 2,
      postss: '자바스크립트 핵심 문법',
      likeCountt: 0,
      date: new Date(),
      author: '지민지'
    },
    {
      id: 3,
      postss: '리액트를 잘 써보자',
      likeCountt: 0,
      date: new Date(),
      author: '민지민'
    }]
  );
  console.log(inputs);
  const {id, postss, likeCountt, date, author} = inputs
  console.log(id);




  const handlePlus = (e) => {
    setPlus(e.target.value) 
    // e.target.value 기억하자! => input의 내용물이 바뀔 때 그 값을 추적하는 경로, input type에는 onChange 속성, e 는 event 객체
  };

  const handlePlusButton = () => {
    // const copyPlusPost = [...posts];
    // copyPlusPost.unshift(plus) 
    
    // 또는 // unshift 말고 더 좋은 방법
    // unshift, push 말고 배열 복사본을 만들 때 value값을 추가해도 됨
    const copyPlusPost = [plus, ...posts]
    setPosts(copyPlusPost)
    setPlus('')

    {/* (버그 수정) 포스트 하나 추가 시 좋아요 카운트도 같이 추가 */}
    const copyLikeCount = [0, ...likeCount]
    setLikeCount(copyLikeCount)
  };
  
  return (
    <>
      <div className='inner'>
        {/* 포스트 목록 */}
        {/* <div className='list'>
          <h4>{posts[0]}</h4>
          <p>2023년 1월 20일</p>
          <p>by goni.kim</p>
        </div>
        <div className='list'>
          <h4>{posts[1]}</h4>
          <p>2023년 1월 2일</p>
          <p>by alice</p>
        </div>
        <div className='list'>
          <h4>{posts[2]}</h4>
          <p>2022년 12월 20일</p>
          <p>by hero</p>
        </div> */}

        {/* Quiz: map()을 이용하여 posts 배열 반복 출력하기 */}
        {/* 리턴 안에 여러줄을 넣을거면 () 소괄호로 묶어서 처리하기 */}
        {/* key 값은 가장 부모한테 주면 됨 */}
        {/* 예제에서는 key값에 index 라고 하지만 실제로는 주면 안됨 (버그 많이 발생함) */}
        {posts.map((post, index) => {
          return (
            <div key={index} className='list'
              onClick={() => {
                setShowPostDetail(true);
                setCurrentIndex(index);
              }}>
              <h4>{post}</h4>
              <p>2023년 1월 20일</p>
              <p>by goni.kim</p>

              <hr />

              <div className='toolbar'>
                {/* 좋아요 기능 */}
                <span onClick={(e) => {
                  // (버그 수정) 버블링 수정하기
                  // 현재는 좋아요 버튼을 누를 때 글 상세보기까지 같이 클릭된다 (버블링)
                  // 부모 자식관계에 있을 때 이벤트 버블링이 일어남
                  // 자식에서 일어난 이벤트가 부모에게 전달되지 않길 원할 때 stopPropagation()
                  e.stopPropagation(); // 상위 요소로 퍼지는 이벤트 버블링을 막음
                  const copyLikeCount = [...likeCount]; // 배열의 복사본 만들기 (새로운 배열)
                  copyLikeCount[index]++;
                  setLikeCount(copyLikeCount);
                }}>
                  💖 {likeCount[index]}</span>

                {/* 포스트 삭제 기능 */}
                <span style={{fontSize: 27}} onClick={(e) => {
                  e.stopPropagation(); // 상위 요소로 퍼지는 이벤트 버블링을 막음
                  
                  // Quiz 삭제 기능 만들기
                  // div 하나를 직접 제거 하는것 x
                  // state에서 제거하면 알아서 자동으로 렌더링 o
                  // splice를 이용한 배열 요소 제거 방법
                  // const copyPost = [...posts];
                  // copyPost.splice(index, 1);
                  // setPosts(copyPost);

                  // 또는 배열의 filter() 함수 사용 (깔끔, 자주 사용)
                  const filterdPosts = posts.filter((value, idx) => {
                    return index !== idx;
                  });
                  setPosts(filterdPosts)
                  // (버그 수정) 삭제 시 해당 포스트의 좋아요 카운트도 같이 삭제
                  const copyLikeCount = [...likeCount]
                  copyLikeCount.splice(index, 1);
                  setLikeCount(copyLikeCount);
                }}>
                  🗑
                </span>

              </div>
            </div>
          )
        })}
      </div>

      {/* 포스트 상세보기 */}
      {/* Quiz: input에 제목 입력 후 등록 버튼 누르면 맨 앞에 새로운 포스트 추가 */}
      {/* 
        1) input을 제어 컴포넌트로 만들어서 사용자가 입력한 값을 state로 저장해서 관리
        2) 등록 버튼 클릭 시 posts 상태에 맨 앞에 새로운 데이터 추가
      */}
      <input type='text' 
      value={plus} 
      onChange={handlePlus} />
      <button type='button' onClick={handlePlusButton}>
        {/* div 하나를 새로 생성 x
        posts state에 요소 하나 추가하면 자동으로 랜더링 o */}
        {/* (버그 수정) 포스트 하나 추가 시 좋아요 카운트도 같이 추가 */}
        포스트 등록
      </button>
      {/* Quiz: 조건부 렌더링 */}
      {showPostDetail && <PostDetail posts={posts} currentIndex={currentIndex} setPosts={setPosts} />}
    </>
  )
}

export default PostListItem;