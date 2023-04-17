import { initializeApp } from "firebase/app";

class CloudService {
  constructor() {
    this._config = {
      apiKey: process.env.API_KEY,
      authDomain: "final-progect-eb716.firebaseapp.com",
      projectId: "final-progect-eb716",
      storageBucket: "final-progect-eb716.appspot.com",
      messagingSenderId: "977750211633",
      appId: "1:977750211633:web:46f6fff588e11d5fc5a910",
    };
    this.app = initializeApp(this._config);
  }
}

export const cloudService = new CloudService();
