import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { cloudService } from './CloudService';

class DatabaseService {
  constructor() {
    this.database = getFirestore(cloudService.app);
  }

  createDocument(collectionKey, body) {
    const collectionRef = collection(this.database, collectionKey);
    return addDoc(collectionRef, body);
  }
  
  getCollection(collectionKey) {
    const collectionRef = collection(this.database, collectionKey);
    return getDocs(collectionRef).then((documents) => {
      return documents.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
  }
 
  getDocument(collectionKey, id) {
    const documentRef = doc(this.database, collectionKey, id);
    return this.getDoc(documentRef).then((data) => data.data());
  }
  
  updateDocument(collectionKey, id, body) {
    const document = doc(this._database, collectionKey, id);
    return updateDoc(document, body);
  }
 
  deleteDocument(collectionKey, id) {
    const document = doc(this._database, collectionKey, id);
    return deleteDoc(document);
  }
}

export const databaseService = new DatabaseService();
