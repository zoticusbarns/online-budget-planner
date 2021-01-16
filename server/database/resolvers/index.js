const { queryUser, addUser } = require('./user');
const { queryAccount, addAccount } = require('./account');
const { querySpending } = require('./spending');

module.exports = {
    queryUser,
    addUser,
    queryAccount,
    addAccount,
    querySpending,
}