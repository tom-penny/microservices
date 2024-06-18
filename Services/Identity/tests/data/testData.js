export const PROFILES = Object.freeze([
    Object.freeze({
        username: 'username1'
    }),
    Object.freeze({
        username: 'username2'
    })
])

export const ADDRESSES = Object.freeze([
    Object.freeze({
        id: 'address1',
        street: 'street1',
        city: 'city1',
        region: 'region1',
        country: 'country1',
        zip: 'zip1'
    }),
    Object.freeze({
        id: 'address2',
        street: 'street2',
        city: 'city2',
        region: 'region2',
        country: 'country2',
        zip: 'zip2'
    })
])

export const USERS = Object.freeze([
    Object.freeze({
        id: 'user1',
        email: 'user1@test.com',
        password: 'Password1!',
        profile: PROFILES[0],
        addresses: [ADDRESSES[0]]
    }),
    Object.freeze({
        id: 'user2',
        email: 'user2@test.com',
        password: 'Password2!',
        profile: PROFILES[1],
        addresses: [ADDRESSES[1]]
    })
])