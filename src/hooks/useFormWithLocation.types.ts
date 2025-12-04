export interface UseFormWithLocationOptions<T> {
  onAdd: (data: T) => void;
  onUpdate: (index: number, data: T) => void;
  successMessages: {
    add: string;
    update: string;
  };
}

