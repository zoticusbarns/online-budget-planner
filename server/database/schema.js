const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLFloat,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull
} = require('graphql');


const types = require('./entities');
const { queryUser, addUser, addAccount, queryAccount, querySpending } = require('./resolvers');

const User = types.User;
const Account = types.Account;
const Spending = types.Spending;


const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            user: queryUser,
            accounts: queryAccount,
            spendings: querySpending,
        };
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
        return {
            addUser: addUser,
            addAccount: addAccount,
        };
    }
});


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
