import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons';
import styled from '@emotion/native';

export default function Todo({todo, editTodo, setDone, isEdit, deleteTodo, setEditText, editText}) {
  return (
    <Item key={todo.id}>
      {todo.isEdit ? ( // todo.isEdit이 true이면 TextInput, false면 styleText를 출력해라
        <TextInput
          onSubmitEditing={() => editTodo(todo.id)}
          defaultValue={todo.text}
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

const StyleText = styled.Text`
  text-align: center;
  line-height: 50%;
  font-weight: 800;
`;
