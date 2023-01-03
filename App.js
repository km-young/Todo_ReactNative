import {StatusBar} from 'expo-status-bar';
import styled from '@emotion/native';
import {Alert, TextInput, TouchableOpacity} from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tabs from './components/Tabs';
import Todo from './components/Todo';

import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {dbService} from './firebase';
import {async} from '@firebase/util';

const StyleText = styled.Text`
  text-align: center;
  line-height: 50%;
  font-weight: 800;
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

export default function App() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState('');

  const newTodo = {
    // id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };

  // 글 추가
  const addTodo = async () => {
    // setTodos([...todos, newTodo]);
    await addDoc(collection(dbService, 'todos'), newTodo);
    setText('');
  };

  // 완료 표시
  const setDone = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, 'todos', id), {
      isDone: !todos[idx].isDone,
    });
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
        onPress: async () => {
          // const newTodos = todos.filter((todo) => todo.id !== id);
          // filter 메소드는 immutable이라 todos에 영향을 미치지 못해서 얕은복사를 하지 않았다.
          // setTodos(newTodos);
          await deleteDoc(doc(dbService, 'todos', id));
        },
      },
    ]);
  };

  // 글 수정 (isEdit이 true일때 ㅇㅇㅇ해라 라고 할거기때문에 isDone이랑 로직이 동일함)
  const isEdit = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, 'todos', id), {
      isEdit: !todos[idx].isEdit,
    });
  };

  // 수정 text 입력 후 엔터 눌렀을 때 실행
  const editTodo = async (id) => {
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].text = editText;
    // newTodos[idx].isEdit = false; // isEdit값을 닫아준다
    // setTodos(newTodos);
    // setEditText('');
    await updateDoc(doc(dbService, 'todos', id), {
      text: editText,
      isEdit: false,
    });
  };

  // 컴포넌트가 마운트 될 때 마다 실행
  useEffect(() => {
    // 1. onSnapshot API 이용해서 todos 콜렉션에 변경이 생길 때 마다
    // 2. todos 콜렉션 안의 모든 document들을 불러와서 setTodos 한다.
    const q = query(
      collection(dbService, 'todos'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newTodo;
      });
      setTodos(newTodos);
    });

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, 'category', 'currentCategory')
      );
      console.log('snapshot.id:', snapshot.id);
      console.log('snapshot.date:', snapshot.data());
      setCategory(snapshot.data().category);
    };
    getCategory();
  }, []);

  // 카테고리 저장
  const setCat = async (cat) => {
    setCategory(cat);
    // await AsyncStorage.setItem('category', cat); // data type이 string이라 stringify 할 필요 없다.
    await updateDoc(doc(dbService, 'category', 'currentCategory'), {
      category: cat,
    });
  };

  return (
    <SafeView>
      <StatusBar />
      <Tabs setCat={setCat} category={category} />
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
              <Todo
                key={todo.id}
                todo={todo}
                setDone={setDone}
                editTodo={editTodo}
                isEdit={isEdit}
                deleteTodo={deleteTodo}
                setEditText={setEditText}
                editText={editText}
              />
            );
          }
        })}
      </ItemContainer>
    </SafeView>
  );
}
