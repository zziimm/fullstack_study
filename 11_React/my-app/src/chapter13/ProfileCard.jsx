import React from 'react';
import Card from './Card';

function ProfileCard(props) {
  return (
    <Card
      title='Goni Kim'
      backgroundcolor='#dee7ff'
    >
      <p>안녕하세요. 고니입니다.</p>
      <p>리액트를 사용해서 개발중입니다.</p>
    </Card>
  );
}

export default ProfileCard;