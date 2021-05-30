// import { ref, watch } from 'vue'

export default function useStorage(storage: Storage) {
  const getItem = (key: string) => {
    const result = JSON.parse(storage.getItem(key) || 'null');
    return result;
  };
  const setItem = (key: string, value: any) => {
    const result = storage.setItem(key, JSON.stringify(value));
    return result;
  };

  return {
    getItem,
    setItem,
  };
}
