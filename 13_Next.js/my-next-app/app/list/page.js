'use client'

import Image from "next/image";
import fruitsImg from "@/public/fruits0.png";
import { useState } from "react";

export default function List() {
  // DB에서 가져온 데이터라고 가정
  const products = ['Apple', 'Orange', 'Grape'];

  // 주문 수량
  // state는 client 컴포넌트에서만 사용 가능
  const [orderCount, setOrderCount] = useState([0, 10, 3]);

  return (
    <>
      <h4 className="title">상품 목록</h4>
      {products.map((item, index) => (
        <div className="fruits" key={index}>
          {/* 이미지 넣기(1) - img 태그 */}
          {/* img 태그에 그냥 절대 경로로 적어주면 public 폴더에서 찾음 */}
          <img src={`/fruits${index}.png`} alt="fruits" className="fruits-img" />

          {/* 이미지 넣기(2) - Image 컴포넌트 */}
          {/* 
            이미지는 일반적인 웹페이지의 무게의 큰 부분을 차지함(즉, 성능에 영향을 미침)
            성능과 속도가 중요하다면 Image 컴포넌트를 통한 이미지 최적화 사용
            1) 사이즈 최적화: 디바이스에 맞는 크기의 이미지를 자동으로 제공
            2) layout shift 방지: 이미지 로딩이 늦어 레이아웃이 밀려나는 현상 방지
            3) 빠른 페이지 로드:
              lazy loading을 사용하여 실제 이미지들이 실제로 화면에 보여질 필요가 있을 때
              (뷰포트에 들어갈 때만) 로딩
              웹 페이지 내에서 바로 로딩을 하지 않고 로딩 시점을 뒤로 미루는 것

              참고 자료: https://nextjs.org/docs/app/building-your-application/optimizing/images
          */}

          {/* 1) 로컬(local) 이미지의 경우 */}
          {/* import로 이미지 가져오기
            Next.js가 가져온 이미지로부터 자동으로 width, height값을 결정
            이 값은 이미지가 로딩될 때 layout shift를 방지
          */}
          {/* <Image src={fruitsImg} alt="fruits" className="fruits-img" /> */}

          {/* 2) 원격(remote) 이미지의 경우 */}
          {/* next.config.js에 원격 도메인 설정 필요,
            width, height를 직접 제공해야 됨 */}
          {/* <Image 
            src="https://goniboard.s3.ap-northeast-2.amazonaws.com/dog.JPG"
            alt="dog"
            width={160}
            height={160}
          /> */}
          <h4>{item}</h4>

          {/* 주문 수량 만들기 */}
          {/* onClick 이벤트 리스너와 이벤트 핸들러 함수를 쓰려면
            => client 컴포넌트로 변경 */}
          <button type="button" onClick={() => {
            let copyNum = [...orderCount];
            let change = copyNum[index] - 1;
            copyNum[index] = change;
            setOrderCount([...copyNum]);

          }}>
            -
          </button>
          <span>{orderCount[index]}</span>
          <button type="button" onClick={() => {
            let copyNum = [...orderCount];
            let change = copyNum[index] + 1;
            copyNum[index] = change;
            setOrderCount([...copyNum]);
          }}>
            +
          </button>
        </div>
      ))
      };
    </>
  )
}