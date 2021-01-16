const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLFloat,
        GraphQLList,
    } = require('graphql');

const User = require('./user');
const Spending = require('./spending');

module.exports = (types) => new GraphQLObjectType({
    name: 'Account',
    description: 'Users\' spending account',
    fields () {
        return {
        name: {
            type: GraphQLString,
            resolve (account) {
            return account.name;
            }
        },
        balance: {
            type: GraphQLFloat,
            resolve (account) {
            return account.balance;
            }
        },
        owner: {
            type: types.User,
            resolve (account) {
            return account.getUser();
            }
        },
        spendings: {
            type: new GraphQLList(types.Spending),
            resolve (account) {
            return account.getSpendings();
            }
        }
        };
    }
});