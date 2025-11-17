const storageTool = {
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Get errors in localStorage set value:', error);
    }
  },

  get<T>(key: string): T | string | null {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;

      try {
        return JSON.parse(value) as T;
      } catch {
        return value;
      }
    } catch (error) {
      console.error('Get errors in localStorage get item:', error);
      return null;
    }
  },

  getRaw(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Get errors in localStorage getRaw:', error);
      return null;
    }
  },

  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Get errors in localStorage has check:', error);
      return false;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Get errors in localStorage remove item:', error);
    }
  },

  clearAll(): void {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error('Get errors in localStorage delete all items:', error);
    }
  },
};

export default storageTool;
