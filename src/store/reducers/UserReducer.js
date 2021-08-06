const UserState = {
  isLogin: false,
  userInfo: {
    age: '',
    name: '',
    sex: '',
    tm: 0,
    uid: 0,
    userName: '',
  },
};

export default function UserReducer(state = UserState, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return setUserInfo(state, action);
    case 'CLEAR_USER_INFO':
      return clearUserInfo(state, action);
    default:
      return state;
  }
}

function setUserInfo(state, {userInfo}) {
  return Object.assign({}, state, {
    isLogin: true,
    userInfo: {
      age: userInfo.age,
      name: userInfo.name,
      sex: userInfo.sex,
      tm: userInfo.tm,
      uid: userInfo.uid,
      userName: userInfo.userName,
    },
  });
}
function clearUserInfo(state, action) {
  return Object.assign({}, state, {
    isLogin: false,
    userInfo: {
      age: '',
      name: '',
      sex: '',
      tm: 0,
      uid: 0,
      userName: '',
    },
  });
}
