export const baseUrlForEndpoint = 'https://localhost:5201/api'

export const links = {
    login: '/auth/login',
    register: '/auth/register',
    transactionGroups: '/UserTransactionGroup/getAllByUserId',
    updateTransactionGroup: '/UserTransactionGroup/update',
    deleteTransactionGroup: '/UserTransactionGroup/delete',
    transactions: '/Transaction/getallbygroupId',
    deleteTransaction: '/Transaction/deleteById',
}