import { FirebaseError } from 'firebase/app'
import { FirestoreError } from 'firebase/firestore'

export const handleFirebaseError = (err, req, res, next) => {

    if (err instanceof FirebaseError || err instanceof FirestoreError) {

        switch (err.code) {

            case 'auth/invalid-email':
                return res.status(400).send({ message: 'Invalid email' })
            case 'auth/wrong-password':
                return res.status(401).send({ message: 'Wrong password' })
            case 'auth/user-not-found':
                return res.status(404).send({ message: 'User not found' })
            case 'auth/email-already-in-use':
                return res.status(409).send({ message: 'Email already in use' })

            case 'permission-denied':
                return res.status(403).send({ message: 'Permission denied' })
            case 'not-found':
                return res.status(404).send({ message: 'Not found' })
            case 'already-exists':
                return res.status(409).send({ message: 'Already exists' })
            case 'unavailable':
                return res.status(503).send({ message: 'Service unavailable' })

            default:
                return res.status(500).send({ message: 'Internal server error' })
        }
    }

    next(err)
}