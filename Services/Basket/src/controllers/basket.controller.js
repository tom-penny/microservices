import { v4 as uuid } from 'uuid'
import * as Basket from '../models/basket.js'
import { calculateValue } from '../services/basket.service.js'
import publishCheckout from '../messages/checkout.publish.js'

export const getBasketById = async (req, res, next) => {
    try {
        const { id } = req.params
        const basket = await Basket.getById(id)
        if (basket) return res.status(200).send({ basket })
        res.status(404).send({ message: 'Basket not found' })
    }
    catch (err) { next(err) }
}

export const updateBasket = async (req, res, next) => {
    try {
        const { id } = req.params
        const { basket } = req.body
        await Basket.update(id, basket)
        res.status(200).send({ basket })
    }
    catch (err) { next(err) }
}

export const checkoutBasket = async (req, res, next) => {
    try {
        const { id } = req.params
        const { addressId, basket } = req.body
        const checkoutId = uuid()
        const basketValue = calculateValue(basket)
        await Basket.update(id, basket)
        await publishCheckout(checkoutId, id, addressId, basket, basketValue)
        return res.status(200).send({ checkoutId, basketValue })
    }
    catch (err) { next(err) }
}