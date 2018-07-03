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

app.route('/api/fetchReviews/:projectID/:recipientID').get((req, res) => {
    const projectID = req.params.projectID
    const recipientID = req.params.recipientID
    console.log("ProjectID: " + projectID);
    console.log("RecipientID: " + recipientID);

    let retVal;
    sequelize.query('SELECT * FROM entries WHERE recipientID = ' + recipientID + " AND projectID = " + projectID,  {model : Entry}).then(ret => {
        console.log("Fetched Reviews");
        res.send({
            ret
        });
    });
});

app.route('/api/pushReview/:author/:authorID/:recipient/:recipientID/:rating/:comment/:projectID').get((req, res) => {
    var sql = "INSERT INTO entries (author, authorID, recipient, recipientID, rating, comment, projectID) VALUES ('" + req.params.author + "'," +
        req.params.authorID + ",'" + req.params.recipient + "'," + req.params.recipientID + "," + req.params.rating + ",'" + req.params.comment + "'," + req.params.projectID + ")";
    sequelize.query(sql, function(err, result){
        if (err) throw err;
        console.log("Inserted.");
        //return 'success';
    });
})

app.route('/api/updateReview/:author/:authorID/:recipient/:recipientID/:rating/:comment/:projectID').get((req, res) => {
    var sql = "UPDATE entries SET rating =" + req.params.rating + ", comment='" + req.params.comment + "' WHERE authorID=" + req.params.authorID + " AND recipientID=" + req.params.recipientID + ';';
    sequelize.query(sql, {model : Entry}).then(ret => {
        console.log("Fetched target review.");
        res.send({
            ret
        });
    });
})

app.route('/api/requestReview/:authorID/:recipientID/:projectID').get((req, res) => {
    var sql = "SELECT * FROM entries WHERE recipientID=" + req.params.recipientID + " AND authorID=" + req.params.authorID + " AND projectID=" + req.params.projectID;
    sequelize.query(sql, {model : Entry}).then(ret => {
        console.log("Fetched target review.");
        res.send({
            ret
        });
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// Start server w/ node hello.js in the same directory. CD To it.