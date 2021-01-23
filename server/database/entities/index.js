const UserInject = require('./user');
const AccountInject = require('./account');
const SpendingInject = require('./spending');

const types = {};
types.User = UserInject(types);
types.Account = AccountInject(types);
types.Spending = SpendingInject(types);

module.exports = types;