const {
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');

const { conn: Db } = require('../db');
const types = require('../entities');

queryAccount = {
    type: new GraphQLList(types.Account),
    args: {
        id: {
            type: GraphQLInt
        },
    },
    resolve (root, args) {
    return Db.models.account.findAll({ where: args });
    }
};

addAccount = {
    type: types.Account,
    args: {
    userId: {
        type: GraphQLNonNull(GraphQLInt)
    },
    name: {
        type: GraphQLNonNull(GraphQLString)
    },
    balance: {
        type: GraphQLNonNull(GraphQLFloat)
    },
    currency: {
        type: GraphQLNonNull(GraphQLString)
    }
    },
    resolve (source, args) {
    return Db.models.user.findById(args.userId).then( user => {
        return user.createAccount({
        name: args.name,
        balance: args.balance,
        currency: args.currency,
        });
    });
    }
};

module.exports = {
    queryAccount,
    addAccount,
}