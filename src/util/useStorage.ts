const useStorage = (storage: Storage) => {
  const getItem = (key: string) => JSON.parse(storage.getItem(key) || 'null');
  const setItem = (key: string, value: any) => storage.setItem(key, JSON.stringify(value));

  return {
    getItem,
    setItem,
  };
};

export default useStorage;
