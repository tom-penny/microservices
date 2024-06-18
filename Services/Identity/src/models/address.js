import { getFirestore, doc, getDoc, addDoc, collection as col, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { firebaseApp as app } from '../config/firebase.js'

const db = getFirestore(app)

export const getById = async (addressId) => {
    try {
        const document = doc(db, 'addresses', addressId)
        const address = await getDoc(document)
        return address.exists() ? address.data() : null
    }
    catch (err) { throw err }
}

export const getAll = async (userId) => {
    try {
        const document = doc(db, 'users', userId)
        const user = await getDoc(document)
        if (!user.exists()) return null
        const refs = user.data().addresses
        if (!refs || refs.length === 0) return []
        const addresses = await Promise.all(
            refs.map(async (ref) => {
                const address = await getDoc(ref)
                return { id: ref.id, ...address.data() }
            })
        )
        return addresses
    }
    catch (err) { throw err }
}

export const create = async (userId, address) => {
    try {
        const collection = col(db, 'addresses')
        const addressDocument = await addDoc(collection, address)
        const userDocument = doc(db, 'users', userId)
        await updateDoc(userDocument, { addresses: arrayUnion(addressDocument) })
        return addressDocument.id
    }
    catch (err) { throw err }
}

export const remove = async (userId, addressId) => {
    try {
        const userDocument = doc(db, 'users', userId)
        const addressDocument = doc(db, 'addresses', addressId)
        await updateDoc(userDocument, { addresses: arrayRemove(addressDocument) })
    }
    catch (err) { throw err }
}