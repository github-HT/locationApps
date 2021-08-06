import AsyncStorage from '@react-native-async-storage/async-storage';

function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(res => {
        resolve(res ? JSON.parse(res) : null);
      })
      .catch(err => {
        console.log('AsyncStorage getItem err', err);
        reject(null);
      });
  });
}
function setItem(key, content) {
  const param = JSON.stringify(content);
  return AsyncStorage.setItem(key, param);
}
function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export const UtilStorage = {
  getItem,
  setItem,
  removeItem,
};
