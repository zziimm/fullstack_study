import React from 'react';
import styled from "styled-components";


const NewsItemBlock = styled.div`
  display: flex;

  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }

  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }

    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }

  & + & {
    margin-top: 3rem;
  }
`;

// 각 뉴스 정보를 보여주는 컴포넌트
function NewsItem({ article }) {
  const { title, description, url, urlToImage } = article;
  // console.log(article);
  return (
    <NewsItemBlock>
      {/* 이미지가 있을때만 조건부 렌더링 */}
      {urlToImage && (
        <div className='thumbnail'>
          <a href={url} target='blank'>
            <img src={urlToImage} alt="news-image" />
          </a>
        </div>
      )}

      <div className='contents'>
        <h2>
          <a href={url} target='blank'>{title}</a>
        </h2>
        <p>{description}</p>

      </div>
    </NewsItemBlock>
  );
}

export default NewsItem;