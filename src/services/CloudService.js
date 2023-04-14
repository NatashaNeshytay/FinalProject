import { initializeApp } from 'firebase/app';

class CloudService {
  constructor() {
    this._config = {
      apiKey: process.env.API_KEY,
      authDomain: 'it-shop-7e932.firebaseapp.com',
      projectId: 'it-shop-7e932',
      storageBucket: 'it-shop-7e932.appspot.com',
      messagingSenderId: '1078956985327',
      appId: '1:1078956985327:web:8072edd24e42b207b4841a',
    };
    this.app = initializeApp(this._config);
  }
}

export const cloudService = new CloudService();
