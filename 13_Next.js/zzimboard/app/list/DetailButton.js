'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DetailButton(props) {
  const router = useRouter(); 
  // 장점: 단순 페이지 이도 외에 여러가지 기능들이 많음
  // back(); 뒤로 가기
  // forward(): 앞으로 가기
  // refresh(): soft refresh, 변동이 있는 일부분만 바꿔줌
  // prefetch(): 페이지 미리롣(빠르게 이동 가능)
  // push(): 히스토리가 쌓임

  // replace(): 히스토리가 안쌓임 

  // client 컴포넌트에서만 사용 가능
  // server 컴포넌트에서 사용하고 싶으면 따로 client 컴포넌트로 추출하고 가져다 사용

  // 그 외
  usePathname(); // 현재 URL정보
  useSearchParams(); // Search Parameter(=Query String) 정보
  useParams(); // Dynamic Routes 정보

  return (
    <button type="button" onClick={() => {
      router.push(`/detail/${props.postId}`)
    }}>
      상세보기
    </button>
  );
}