const {
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');

const { conn: Db } = require('../db');
const types = require('../entities');

querySpending = {
    type: new GraphQLList(types.Account),
    args: {
        id: {
            type: GraphQLInt
        },
        category: {
            type: GraphQLString
        },
    },
    resolve (root, args) {
    return Db.models.spending.findAll({ where: args });
    }
};


module.exports = {
    querySpending,
};