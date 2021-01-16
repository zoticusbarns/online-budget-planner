const {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const { conn: Db } = require('../db');
const types = require('../entities');

queryUser = {
    type: new GraphQLList(types.User),
    args: {
    id: {
        type: GraphQLInt,
    },
    email: {
        type: GraphQLString
    }
    },
    resolve (root, args) {
    return Db.models.user.findAll({ where: args });
    }
};

addUser = {
    type: types.User,
    args: {
    username: {
        type: new GraphQLNonNull(GraphQLString)
    },
    password: {
        type: new GraphQLNonNull(GraphQLString)
    },
    email: {
        type: new GraphQLNonNull(GraphQLString)
    }
    },
    resolve (source, args) {
    return Db.models.user.create({
        username: args.username,
        password: args.password,
        email: args.email.toLowerCase()
    });
    }
};

module.exports = {
    addUser,
    queryUser,
}