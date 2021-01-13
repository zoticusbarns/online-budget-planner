const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');
  
const { conn: Db } = require('../db');

const Spending = new GraphQLObjectType({
    name: 'Spending',
    description: 'Users\' spendings record',
    fields () {
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
            type: User,
            resolve (spending) {
            return spending.getAccount();
            }
        }
        };
    }
    });

const Account = new GraphQLObjectType({
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
        type: User,
        resolve (account) {
        return account.getUser();
        }
    },
    spendings: {
        type: new GraphQLList(Spending),
        resolve (account) {
        return account.getSpendings();
        }
    }
    };
}
});

const User = new GraphQLObjectType({
name: 'User',
description: 'This represents a user',
fields: () => {
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
        type: new GraphQLList(Account),
        resolve (user) {
        return user.getAccounts();
        }
    }
    };
}
});

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
