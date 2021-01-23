const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLList,
    } = require('graphql');

User = (types) => new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => {
        console.log(types.Account);
        return {
        id: {
            type: GraphQLInt,
            resolve (user) {
            return user.id;
            }
        },
        username: {
            type: GraphQLString,
            resolve (user) {
            return user.username;
            }
        },
        password: {
            type: GraphQLString,
            resolve (user) {
            return user.password;
            }
        },
        email: {
            type: GraphQLString,
            resolve (user) {
            return user.email;
            }
        },
        accounts: {
            type: new GraphQLList(types.Account),
            resolve (user) {
            return user.getAccounts();
            }
        }
        };
    }
});

module.exports = User;