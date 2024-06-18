import * as Profile from '../models/profile.js'
import * as Address from '../models/address.js'

export const getProfileById = async (req, res, next) => {
    try {
        const { id } = req.params
        const profile = await Profile.getById(id)
        if (profile) return res.status(200).send({ profile })
        res.status(404).send({ message: 'Profile not found' })
    }
    catch (err) { next(err) }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params
        const { profile } = req.body
        await Profile.update(id, profile)
        res.status(200).send()
    }
    catch (err) { next(err) }
}

export const getAddressById = async (req, res, next) => {
    try {
        const { addressId } = req.params
        const address = await Address.getById(addressId)
        if (address) return res.status(200).send({ address })
        res.status(404).send({ message: 'Address not found' })
    }
    catch (err) { next(err) }
}

export const getAllAddresses = async (req, res, next) => {
    try {
        const { id } = req.params
        const addresses = await Address.getAll(id)
        if (addresses) return res.status(200).send({ addresses })
        res.status(404).send({ message: 'User not found' })
    }
    catch (err) { next(err) }
}

export const createAddress = async (req, res, next) => {
    try {
        const { id } = req.params
        const { address } = req.body
        const addressId = await Address.create(id, address)
        res.status(201).send({ address: { id: addressId, ...address }})
    }
    catch (err) { next(err) }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const { id, addressId } = req.params
        await Address.remove(id, addressId)
        res.status(204).send()
    }
    catch (err) { next(err) }
}