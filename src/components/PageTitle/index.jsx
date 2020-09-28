import React from 'react';
import styled from 'styled-components';

const TitlePageContent = styled.div`
  height: 100px;
  background: var(--color-background);
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;

  span {
    font: 400 32px Montserrat;
    line-height: 40px;
    letter-spacing: -1.5px;    
  }
`;

export default function Index(props) {
  
  const { title } = props;
  
  return (
    <>
      <TitlePageContent>
        <span>{title}</span>
      </TitlePageContent>
    </>
  )
}
