import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseApp as app } from '../config/firebase.js'

const db = getFirestore(app)

export const getById = async (userId) => {
    try {
        const document = doc(db, 'users', userId)
        const user = await getDoc(document)
        return user.exists() ? user.data().profile : null
    }
    catch (err) { throw err }
}

export const update = async (userId, profile) => {
    try {
        const document = doc(db, 'users', userId)
        await setDoc(document, { profile }, { merge: true })
    }
    catch (err) { throw err }
}