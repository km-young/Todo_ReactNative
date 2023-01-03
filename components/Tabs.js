import React from 'react';
import styled from '@emotion/native';

export default function Tabs({setCat, category}) {
  return (
    <NavContainer flexWay={'row'}>
      <StyledTouchNav
        onPress={() => setCat('js')}
        style={{backgroundColor: category === 'js' ? '#0FBCF9' : 'grey'}}
      >
        <StyleText>Javascript</StyleText>
      </StyledTouchNav>
      <StyledTouchNav
        onPress={() => setCat('react')}
        style={{backgroundColor: category === 'react' ? '#0FBCF9' : 'grey'}}
      >
        <StyleText>React</StyleText>
      </StyledTouchNav>
      <StyledTouchNav
        onPress={() => setCat('ct')}
        style={{backgroundColor: category === 'ct' ? '#0FBCF9' : 'grey'}}
      >
        <StyleText>Coding Text</StyleText>
      </StyledTouchNav>
    </NavContainer>
  );
}

const NavContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTouchNav = styled.TouchableOpacity`
  width: 100px;
  background-color: gray;
`;

const StyleText = styled.Text`
  text-align: center;
  line-height: 50%;
  font-weight: 800;
`;