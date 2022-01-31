const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    SELECT * FROM "user_messages"
      WHERE "sender_id" = $1 OR "recipient_id" = $1
      ORDER BY "timestamp" ASC;
    `;
  const sqlValues = [req.user.id]

  pool.query(sqlQuery, sqlValues)
  .then((result) => {

    //Grabs Unique Users that req.user has talked to and stashes them in Array
    let uniqUsers = [];
    for (let i in result.rows){
      if (result.rows[i].sender_id != req.user.id){
        if (uniqUsers.includes(result.rows[i].sender_id) === false){
          uniqUsers.push(result.rows[i].sender_id)
        }
      }
      if (result.rows[i].recipient_id != req.user.id){
        if (uniqUsers.includes(result.rows[i].recipient_id) === false){
          uniqUsers.push(result.rows[i].recipient_id)
        }
      }  
    }
  
    //Use uniqUsers to group message history into nested object arrays
    console.log(uniqUsers)
    let sortedConvos = [];
    for(let i in uniqUsers){
      let messages = []
      
      for (let y in result.rows){
        if ((result.rows[y].sender_id || result.rows[y].recipient_id) === uniqUsers[i]){
          
          // messages = [...messages, result.rows[y]]
          // messages.push(result.rows[y])
        }
      }

      let uniqConvo = {
        uniqUser: uniqUsers[i],
        messages: messages
      }

      sortedConvos.push(uniqConvo)
    }
    console.log(sortedConvos);

    res.send(sortedConvos)
  })

  
  .catch((error) => {
    console.log('error fetching user messages', error)
    res.sendStatus(500);
  })
})

// POST
router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlValues = [
    req.body.content, 
    req.body.timestamp, 
    req.body.recipient_id, 
    req.user.id
  ];
  const sqlQuery = `
    INSERT INTO "user_messages"
      ("content", "timestamp", "recipient_id", "sender_id")
      VALUES ($1, $2, $3, $4)
  `;

  pool.query(sqlQuery, sqlValues)
  .then((result) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error posting new message', error)
    res.sendStatus(500);
  })
});

module.exports = router;