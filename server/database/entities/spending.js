const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLFloat,
    } = require('graphql');

module.exports = (types) => new GraphQLObjectType({
    name: 'Spending',
    description: 'Users\' spendings record',
    fields () {
        console.log(types.User);
        return {
        description: {
            type: GraphQLString,
            resolve (spending) {
            return spending.description;
            }
        },
        amount: {
            type: GraphQLFloat,
            resolve (spending) {
            return spending.amount;
            }
        },
        currency: {
            type: GraphQLString,
            resolve (spending) {
            return spending.currency;
            }
        },
        date: {
            type: GraphQLString,
            resolve (spending) {
            return spending.date;
            }
        },
        owner: {
            type: types.User,
            resolve (spending) {
            return spending.getAccount();
            }
        }
        };
    }
});