const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.processRegistration = functions.auth.user().onCreate(async (user) => {
    try {
        const userId = user.uid;

        // Assign 'customer' role to new user.

        await admin.auth().setCustomUserClaims(userId, { roles: ['customer'] });
        functions.logger.info(`Assigned roles for user: ${userId}`);

        // Create profile for new user.
        
        const document = db.collection('users').doc(userId);
        await document.set({ profile: {}, addresses: [] }, { merge: true });
        functions.logger.info(`Created profile for user: ${userId}`);
    }
    catch (err) { functions.logger.error(err); }
});