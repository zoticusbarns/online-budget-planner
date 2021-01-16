require('dotenv').config();
const Sequelize = require('sequelize');
const Faker = require('faker');
const _ = require('lodash');

const Conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgresql',
});

const User = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

const Account = Conn.define('account', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    balance: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Spending = Conn.define('spending', {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Relations
User.hasMany(Account);
Account.belongsTo(User);
Account.hasMany(Spending);
Spending.belongsTo(Account);

Conn.sync({ force: true }).then(()=> {
  _.times(10, ()=> {
    return User.create({
      username: Faker.internet.userName(),
      password: Faker.internet.password(),
      email: Faker.internet.email()
    }).then(user => {
      return user.createAccount({
        name: `${user.username}'s account`,
        balance: Faker.finance.amount(),
        currency: Faker.finance.currencyCode(),
      }).then(account => {
        return account.createSpending({
            description: Faker.finance.transactionDescription(),
            amount: Faker.finance.amount(),
            category: "Daily",
            currency: Faker.finance.currencyCode(),
            date: "14-1-2021",
        })
      });
    });
  });
});

module.exports.conn = Conn;
