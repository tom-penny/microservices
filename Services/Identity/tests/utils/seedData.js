import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { USERS } from '../data/testData.js'

const app = initializeApp()

const auth = getAuth(app)
const firestore = getFirestore(app)
firestore.settings({ host: '127.0.0.1:8080', ssl: false })

const seedData = async () => {

    for (const user of USERS) {

        await auth.createUser({
            uid: user.id,
            email: user.email,
            password: user.password
        })

        const addressRefs = await Promise.all(
            user.addresses.map(async (address) => {
                const addressRef = firestore.collection('addresses').doc(address.id)
                await addressRef.set(address)
                return addressRef
            })
        )

        const userRef = firestore.collection('users').doc(user.id)
        await userRef.set({
            profile: user.profile,
            addresses: addressRefs
        })
    }
}

export default seedData