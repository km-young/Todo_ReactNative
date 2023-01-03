import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyDjXCGt1U0yTmKEkdpPEY2zasyJ3KzZqQY',
  authDomain: 'todolist-reactnative-77df2.firebaseapp.com',
  projectId: 'todolist-reactnative-77df2',
  storageBucket: 'todolist-reactnative-77df2.appspot.com',
  messagingSenderId: '306133761815',
  appId: '1:306133761815:web:7a2fd84faceb19cf26c152',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app); // dbService로 프로젝트와 firebase와의 연결
