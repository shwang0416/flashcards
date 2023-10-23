/**
 * array를 받아서 양방향 linkedList를 반환
 */
export type LinkedList = {
  [id: Id]: {
    next: Id | null;
    prev: Id | null;
  };
};

type Id = string | number;

const getLinkedList = (array: Id[]): LinkedList => {
  const linkedList: LinkedList = {};
  for (let i = 0; i < array.length; i++) {
    const prev = i === 0 ? null : array[i - 1];
    const next = i === array.length - 1 ? null : array[i + 1];

    const id = array[i];
    linkedList[id] = {
      prev,
      next,
    };
  }

  return linkedList;
};

export default getLinkedList;
