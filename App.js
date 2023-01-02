import {StatusBar} from 'expo-status-bar';
import styled from '@emotion/native';
import {Alert, TextInput, TouchableOpacity} from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons';
import {useState} from 'react';

const StyledTouchNav = styled.TouchableOpacity`
  width: 100px;
  background-color: gray;
`;

const StyleText = styled.Text`
  text-align: center;
  line-height: 50%;
  font-weight: 800;
`;
const NavContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const InputContainer = styled.View`
  justify-content: center;
  border-color: black;
  border-bottom-width: 3px;
  border-top-width: 3px;
  margin: 15px 0;
  padding: 15px 0;
`;

const SafeView = styled.SafeAreaView`
  width: 90%;
  margin: 0 auto;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  height: 45px;
  border-width: 2px;
  font-size: 18px;
  padding: 0 15px;
`;

const ItemContainer = styled.View``;
const Item = styled.View`
  flex-direction: row;
  background-color: #ddd;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 0 0 10px 0;
`;

const Icons = styled.View`
  flex-direction: row;
  width: 90px;
  justify-content: space-between;
`;

export default function App() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState('');


  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };

  // 글 추가
  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setText('');
  };

  // 완료 표시
  const setDone = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  // 글 삭제
  const deleteTodo = (id) => {
    Alert.alert('Todo 삭제', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          // filter 메소드는 immutable이라 todos에 영향을 미치지 못해서 얕은복사를 하지 않았다.
          setTodos(newTodos);
        },
      },
    ]);
  };

  // 글 수정 (isEdit이 true일때 ㅇㅇㅇ해라 라고 할거기때문에 isDone이랑 로직이 동일함)
  const isEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  // 수정 text 입력 후 엔터 눌렀을 때 실행
  const editTodo = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false; // isEdit값을 닫아준다
    setTodos(newTodos);
    setEditText('');
  };

  return (
    <SafeView>
      <StatusBar />
      <NavContainer flexWay={'row'}>
        <StyledTouchNav
          onPress={() => setCategory('js')}
          style={{backgroundColor: category === 'js' ? '#0FBCF9' : 'grey'}}
        >
          <StyleText>Javascript</StyleText>
        </StyledTouchNav>
        <StyledTouchNav
          onPress={() => setCategory('react')}
          style={{backgroundColor: category === 'react' ? '#0FBCF9' : 'grey'}}
        >
          <StyleText>React</StyleText>
        </StyledTouchNav>
        <StyledTouchNav
          onPress={() => setCategory('ct')}
          style={{backgroundColor: category === 'ct' ? '#0FBCF9' : 'grey'}}
        >
          <StyleText>Coding Text</StyleText>
        </StyledTouchNav>
      </NavContainer>

      <InputContainer>
        <StyledInput
          onSubmitEditing={addTodo}
          value={text}
          onChangeText={setText}
        />
      </InputContainer>

      <ItemContainer>
        {todos.map((todo) => {
          if (category === todo.category) {
            return (
              <Item key={todo.id}>
                {todo.isEdit ? ( // todo.isEdit이 true이면 TextInput, false면 styleText를 출력해라
                  <TextInput
                    onSubmitEditing={() => editTodo(todo.id)}
                    value={editText}
                    onChangeText={setEditText}
                    style={{backgroundColor: 'white', flex: 1}}
                  />
                ) : (
                  <StyleText
                    style={{
                      textDecorationLine: todo.isDone ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </StyleText>
                )}
                <Icons>
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <AntDesign name='checksquare' size={24} color='black' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => isEdit(todo.id)}>
                    <Feather name='edit' size={24} color='black' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    {/* 삭제버튼에 delete 기능 추가 */}
                    <AntDesign name='delete' size={24} color='black' />
                  </TouchableOpacity>
                </Icons>
              </Item>
            );
          }
        })}
      </ItemContainer>
    </SafeView>
  );
}
