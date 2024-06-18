export const calculateValue = (basket) => {
    return Object.values(basket).reduce((total, item) =>
        total + item.unitPrice * item.quantity, 0)
}