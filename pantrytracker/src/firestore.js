import { db } from './firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, Timestamp } from 'firebase/firestore';

const addItem = async (userId, item) => {
  await addDoc(collection(db, 'pantryItems'), { ...item, userId });
};

const getItems = async (userId) => {
  const q = query(collection(db, 'pantryItems'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    items.push({
      id: doc.id,
      ...data,
      expiryDate: data.expiryDate ? data.expiryDate.toDate() : null, // Convert Timestamp to Date or set to null
    });
  });
  return items;
};

const updateItem = async (id, updatedItem) => {
  const itemDoc = doc(db, 'pantryItems', id);
  if (updatedItem.expiryDate instanceof Date) {
    updatedItem.expiryDate = Timestamp.fromDate(updatedItem.expiryDate); // Convert Date to Timestamp
  }
  await updateDoc(itemDoc, updatedItem);
};

const deleteItem = async (id) => {
  const itemDoc = doc(db, 'pantryItems', id);
  await deleteDoc(itemDoc);
};

export { addItem, getItems, updateItem, deleteItem };
