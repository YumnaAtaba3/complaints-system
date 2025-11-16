function checkIsBrowser(): boolean {
  return typeof window !== "undefined";
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const defaultGetStorage = (): StorageLike | null =>
  checkIsBrowser() ? localStorage : null;

export const dataStorage = <T = unknown>(
  key: string,
  getStorage: () => StorageLike | null = defaultGetStorage
) => {
  const storage = getStorage();

  return {
    set: (data: T): void => {
      if (checkIsBrowser() && storage) {
        storage.setItem(key, JSON.stringify(data));
      }
    },
    get: (): T | undefined => {
      if (!checkIsBrowser() || !storage) return undefined;
      const json = storage.getItem(key);
      if (!json) return undefined;
      try {
        return JSON.parse(json) as T;
      } catch {
        return json as unknown as T;
      }
    },
    remove: (): void => {
      if (checkIsBrowser() && storage) {
        storage.removeItem(key);
      }
    },
  };
};

// Persistent user token storage
export const userStorage = dataStorage<string>("token");
