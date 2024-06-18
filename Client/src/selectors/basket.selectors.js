export const selectTotalValue = (state) =>
    Object.values(state.basket.basket)
        .reduce((total, item) => total + item.unitPrice * item.quantity, 0)

export const selectTotalQuantity = (state) =>
    Object.values(state.basket.basket)
        .reduce((total, item) => total + item.quantity, 0)