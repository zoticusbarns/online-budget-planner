const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLFloat,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull
} = require('graphql');

const { conn: Db } = require('./db');
const types = require('./entities');

const User = types.User;
const Account = types.Account;
const Spending = types.Spending;


const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
        user: {
            type: new GraphQLList(User),
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
        },
        accounts: {
            type: new GraphQLList(Account),
            args: {
                id: {
                    type: GraphQLInt
                },
            },
            resolve (root, args) {
            return Db.models.account.findAll({ where: args });
            }
        },
        spendings: {
            type: new GraphQLList(Account),
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
        },
        };
    }
});
    
const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
        return {
        addUser: {
            type: User,
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
        },
        addAccount: {
            type: Account,
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
        }
        };
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
