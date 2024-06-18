import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseAuth as auth } from '../config/firebase.js'

export const registerUser = async (email, password) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        return credential.user.getIdToken()
    }
    catch (err) {
        throw err
    }
}

export const loginUser = async (email, password) => {
    try {
        const credential = await signInWithEmailAndPassword(auth, email, password)
        return credential.user.getIdToken()
    }
    catch (err) { throw err }
}

export const logoutUser = async () => {
    try {
        await signOut(auth)
    }
    catch (err) { throw err }
}

export const getCurrentUserId = async () => {
    try {
        return auth.currentUser.uid
    }
    catch (err) { throw err }
}