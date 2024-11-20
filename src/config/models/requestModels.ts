export type GetOrder = {
    tokenA: string,
    tokenB: string,
    user: string,
    acttive: boolean
}

export type GetMatchingOrders = {
    tokenA: string,
    tokenB: string,
    amountA: number,
    amountB: number
}