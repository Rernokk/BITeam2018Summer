const express = require('express')
const Sequelize = require('sequelize');
const app = express()

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.get('/', (req, res) => res.send('Hello World!'))


const sequelize = new Sequelize('biteamdatabase', 'ssmith37', 'BiTeamProject', {
    host: 'db4free.net',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Entry = sequelize.define('entry', {
    Reviewer: {  
        type: Sequelize.STRING
    },
    ReviewerID: {
        type: Sequelize.INTEGER
    },
    Reviewee: {  
        type: Sequelize.STRING
    },
    RevieweeID: {
        type: Sequelize.INTEGER
    },
    Rating: {
        type:Sequelize.INTEGER
    },
    Feedback: {
        type: Sequelize.STRING
    }
});

Entry.sync().then((responseVal) => {
    // console.log(responseVal);
    // return Entry.create({
    //     Reviewer: "BDC",
    //     ReviewerID: 99,
    //     Reviewee: "AS",
    //     RevieweeID: 15,
    //     Rating: 3,
    //     Feedback: ""
    // })
})

app.route('/api/fetchReviews/:revieweeID/:reviewerID').get((req, res) => {
    const revieweeID = req.params.revieweeID
    console.log("ID: " + revieweeID);
    console.log("ReviewerID: " + req.params.reviewerID);

    let retVal;
    sequelize.query('SELECT * FROM entries WHERE ReviewerID = 3', {model : Entry}).then(ret => {
        //console.log(ret);
        console.log("Fetched Reviews");
        res.send({
            ret
        });
    });
});

sequelize.query('SELECT * FROM entries WHERE ReviewerID = 3', {model : Entry}).then(res => {
    console.log(res);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// Start server w/ node hello.js in the same directory. CD To it.