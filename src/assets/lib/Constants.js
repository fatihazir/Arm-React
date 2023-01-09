export const baseUrlForEndpoint = 'http://localhost:5200/api'

export const links = {
    login: '/auth/login',
    register: '/auth/register',
    transactionGroups: '/UserTransactionGroup/getAllByUserId',
    updateTransactionGroup: '/UserTransactionGroup/update',
    deleteTransactionGroup: '/UserTransactionGroup/delete',
    transactions: '/Transaction/getallbygroupId',
    deleteTransaction: '/Transaction/deleteById',
}