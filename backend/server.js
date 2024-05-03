// const express = require("express");
// const mysql = require("mysql");
// const axios = require("axios");
// const cors = require("cors");
// const compression = require("compression");
// const bodyParser = require("body-parser");

// const port = process.env.port || 3000;
// const app = express();

// var connection = mysql.createPool({
//   host: "sql3.freesqldatabase.com",
//   user: "sql3702214",
//   password: "aFTbJmipKk",
//   database: "sql3702214",
// });

// //app.use(express.json());
// app.use(bodyParser.json());
// app.use(compression());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use("/", express.static("public"));

// // connection.connect((err) => {
// //   if (err) {
// //       console.error('Error connecting to MySQL:', err);
// //       return;
// //   }
// //   console.log('MySQL connected');
// // });

// // Endpoint to get all items
// app.get("/budget/items", async (req, res) => {
//   connection.query("SELECT * FROM budget", function (error, results, fields) {
//     if (error) {
//       console.log("Error: " + error);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Endpoint to get all items for 3 months
// app.get("/budget/items/3", async (req, res) => {
//   connection.query(
//     "SELECT * FROM budget WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) < 3",
//     function (error, results, fields) {
//       if (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // Endpoint to get all items for 6 months
// app.get("/budget/items/6", async (req, res) => {
//   connection.query(
//     "SELECT * FROM budget WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) < 6",
//     function (error, results, fields) {
//       if (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // Endpoint to get a specific label's value
// app.get("/budget/items/:item", (req, res) => {
//   const { item } = req.params;
//   connection.query(
//     "SELECT value FROM budget WHERE expenseType = ?",
//     [item],
//     (error, results) => {
//       if (error) {
//         console.error("Error retrieving: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).json({ error: "Label not found" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // End point to insert items
// app.post("/budget/items", (req, res) => {
//   console.log("request body: " + req.body);
//   //const {label, value} = req.body;
//   const { date, expenseType, amount } = req.body;
//   console.log(
//     "Label: " + expenseType + " value : " + amount + " Month and Year: " + date
//   );
//   if (!expenseType || !amount) {
//     return res
//       .status(400)
//       .json({ error: "Both expense type and amount are required" });
//   }

//   // Insert new budget data into the database
//   connection.query(
//     "INSERT INTO budget (monthAndYear, expenseType, amount) VALUES (?, ?, ?)",
//     [date, expenseType, amount],
//     (error, results) => {
//       if (error) {
//         console.error("Error inserting into database:", error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json({ message: "Budget data inserted successfully" });
//     }
//   );
// });

// // Endpoint to update a expenseType's value
// app.put("/budget/items/:item", async (req, res) => {
//   const { item } = req.params;
//   const { amount } = req.body;

//   console.log("Label : " + item + " params label: " + req.params.item);
//   console.log("Value : " + amount);
//   if (!amount) {
//     return res.status(400).json({ error: "Value is required" });
//   }

//   // Update label's value in the database
//   connection.query(
//     "UPDATE budget SET amount = ? WHERE expenseType = ?",
//     [amount, item],
//     async (error, results) => {
//       if (error) {
//         console.error("Error updating database: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.affectedRows === 0) {
//         res.status(404).json({ error: "Label not found" });
//         return;
//       }
//       res.json({ message: "Budget data updated successfully" });
//     }
//   );
// });

// // Endpoint to delete budget data
// app.delete("/budget/items/:item", (req, res) => {
//   const { item } = req.params;

//   // Delete the budget data from the database
//   connection.query(
//     "DELETE FROM budget WHERE expenseType = ?",
//     [item],
//     (error, results) => {
//       if (error) {
//         console.error("Error deleting from database:", error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.affectedRows === 0) {
//         res.status(404).json({ error: "Label not found" });
//         return;
//       }
//       res.json({ message: "Budget data deleted successfully" });
//     }
//   );
// });

// // earnings APIs
// // Endpoint to get amount
// app.get("/earnings", async (req, res) => {
//   connection.query("SELECT * FROM earnings", function (error, results, fields) {
//     if (error) {
//       console.log("Error: " + error);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Endpoint to get a specific month's amount
// app.get("/earnings/:month", (req, res) => {
//   const { month } = req.params;
//   connection.query(
//     "SELECT amount FROM earnings WHERE month = ?",
//     [month],
//     (error, results) => {
//       if (error) {
//         console.error("Error retrieving: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).json({ error: "Month not found" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // Endpoint to get all earnings for 3 months
// app.get("/earnings/3", async (req, res) => {
//   connection.query(
//     "SELECT * FROM earnings WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) < 3",
//     function (error, results, fields) {
//       if (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // Endpoint to get all items for 6 months
// app.get("/budget/items/6", async (req, res) => {
//   connection.query(
//     "SELECT * FROM budget WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) < 6",
//     function (error, results, fields) {
//       if (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // End point to insert month earnings
// app.post("/earnings", (req, res) => {
//   console.log("request body: " + req.body);
//   //const {label, value} = req.body;
//   const { months, amount } = req.body;
//   console.log("Month : " + months + " amount: " + amount);
//   if (!months || !amount) {
//     return res
//       .status(400)
//       .json({ error: "Both month and amount are required" });
//   }

//   // Insert new earnings data into the database
//   connection.query(
//     "INSERT INTO earnings (month, amount) VALUES (?,?)",
//     [months, amount],
//     (error, results) => {
//       if (error) {
//         console.error("Error inserting into database:", error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       res.json({ message: "earnings and month added successfully" });
//     }
//   );
// });

// // Endpoint to update a amount's value
// app.put("/earnings/:month", async (req, res) => {
//   const { month } = req.params;
//   const { amount } = req.body;

//   console.log(" month: " + req.params.month);
//   console.log(" Value : " + amount);
//   if (!amount) {
//     return res.status(400).json({ error: "Value is required" });
//   }

//   // Update earnings's value in the database
//   connection.query(
//     "UPDATE earnings SET amount = ? WHERE month = ?",
//     [amount, month],
//     async (error, results) => {
//       if (error) {
//         console.error("Error updating database: " + error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.affectedRows === 0) {
//         res.status(404).json({ error: "Month not found" });
//         return;
//       }
//       res.json({ message: "Monthly earnings updated successfully" });
//     }
//   );
// });

// // Endpoint to earnings budget data
// app.delete("/earnings/:month", (req, res) => {
//   const { month } = req.params;

//   // Delete the earnings data from the database
//   connection.query(
//     "DELETE FROM earnings WHERE month = ?",
//     [month],
//     (error, results) => {
//       if (error) {
//         console.error("Error deleting from database:", error);
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       if (results.affectedRows === 0) {
//         res.status(404).json({ error: "Month not found" });
//         return;
//       }
//       res.json({ message: "Monthly earnings deleted successfully" });
//     }
//   );
// });
// app.listen(port, () => {
//   console.log(`Server on port ${port}`);
// });

const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const { error } = require("console");

const port = process.env.port || 3000;
const app = express();

var connection = mysql.createPool({
  host: "sql3.freemysqlhosting.net",
  user: "sql3702463",
  password: "s6pX2QmlNN",
  database: "sql3702463",
});

//app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));

// connection.connect((err) => {
//   if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//   }
//   console.log('MySQL connected');
// });

// Endpoint to get all expenditure items
app.get('/expenditure/items/:userId', async(req, res) => {
    const { userId } = req.params;
    connection.query('SELECT * FROM expenditure where user_id = ?', [userId], function(error, results, fields){
        if(error){
          console.log("Error: " + error);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(results);
    });
});

// Endpoint to get all expenditure items for different number of months
app.get('/expenditure/items/month/:diff/:userId', async(req, res) => {
  const { diff, userId } = req.params;
  console.log("Diff: " + diff);
  const queryString = "SELECT * FROM expenditure WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) > 0 AND TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) <= ? "
  + " AND user_id = ? ORDER BY monthAndYear DESC;";
  connection.query(queryString, [diff, userId], function(error, results, fields){
      if(error){
        console.log("Error: " + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
  });
});

app.get('/expenditure/items/amount/:diff/:userId', async(req, res) => {
  const { diff, userId } = req.params;
  console.log("Diff: " + diff);
  const queryString = "SELECT *, SUM(amount) as amount FROM expenditure WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) > 0 AND TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) <= ? "
  + " AND user_id = ? GROUP BY MONTH(monthAndYear) ORDER BY monthAndYear DESC;";
  connection.query(queryString, [diff, userId], function(error, results, fields){
      if(error){
        console.log("Error: " + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
  });
});

// Endpoint to get a specific label's value for an expenditure
app.get('/expenditure/items/:item/:userId', (req, res) => {
  const { item, userId } = req.params;
  connection.query('SELECT * FROM expenditure WHERE expenseType = ? AND YEAR(monthAndYear) = YEAR(CURDATE()) AND MONTH(monthAndYear) = MONTH(CURDATE()) AND user_id = ?', [item, userId], (error, results) => {
      if (error) {
          console.error('Error retrieving: '+ error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: 'Expenditure type not found' });
          return;
      }
      res.json(results);
  });
});

// End point to get current month total (expenditure)
app.get('/expenditure/items/expenditure/total/:userId', (req, res) => {
  console.log("server.js: calling to get expenditure");
  const { userId }  = req.params;
  console.log("User id: " + userId);
  connection.query('SELECT SUM(amount) as total_expenditure FROM expenditure WHERE YEAR(monthAndYear) = YEAR(CURDATE()) AND MONTH(monthAndYear) = MONTH(CURDATE()) AND user_id = ?', [userId], (error,results) => {
    if (error) {
      console.error('Error retrieving: ' + error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log("results: " + results);
    res.json(results);
  })
})

// End point to insert items
app.post('/expenditure/items/:userId', (req, res) => {
  console.log("request body: " + req.body);
  const { userId } = req.params;
  //const {label, value} = req.body;
  const {date, expenseType, amount} = req.body;
  console.log("User id: server.js: " + userId);
  console.log("Label: " + expenseType + " value : " + amount + " Month and Year: " + date);
    if (!expenseType || amount <= 0) {
        return res.status(400).json({ error: 'Both expense type and amount are required' });
    }

    // Insert new expenditure data into the database
    connection.query('INSERT INTO expenditure (monthAndYear, expenseType, amount, user_id) VALUES (?, ?, ?, ?)', [date, expenseType, amount, userId], (error, results) => {
        if (error) {
            console.error('Error inserting into database:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'expenditure data inserted successfully' });
    });
});


// Endpoint to update a expenseType's value in expenditure
app.put('/expenditure/items/:item/:userId', async (req, res) => {
  const { item, userId } = req.params;
  const { amount } = req.body;

  console.log("Label : " + item + " params label: " + req.params.item);
  console.log("Value : " + amount);
  if (!amount) {
      return res.status(400).json({ error: 'Value is required' });
  }

  // Update label's value in the expenditure database
  connection.query('UPDATE expenditure SET amount = ? WHERE expenseType = ? AND user_id = ? ', [amount, item, userId], async (error, results) => {
      if (error) {
          console.error('Error updating database: ' + error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Label not found' });
          return;
      }
      res.json({ message: 'expenditure data updated successfully' });
  });
});

// Endpoint to delete expenditure data
app.delete('/expenditure/items/:item/:userId', (req, res) => {
  const { item } = req.params;

  // Delete the expenditure data from the database
  connection.query('DELETE FROM expenditure WHERE expenseType = ? AND user_id = ?', [item, userId], (error, results) => {
      if (error) {
          console.error('Error deleting from database:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Label not found' });
          return;
      }
      res.json({ message: 'expenditure data deleted successfully' });
  });
});


// Earnings APIs
// Endpoint to get amount
app.get('/earnings/:userId', async(req, res) => {
  const { userId } = req.params;
  connection.query('SELECT * FROM earnings where user_id = ?', [userId], function(error, results, fields){
      if(error){
        console.log("Error: " + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
  });
});

app.get('/earnings/month/:month/:userId', (req, res) => {
  const { month, userId } = req.params;
  console.log(" Server.js Month: " + month + "User id: " + userId);
  connection.query('SELECT amount FROM earnings WHERE month = ? AND user_id = ?', [month, userId], (error, results) => {
      if (error) {
          console.error('Error retrieving: '+ error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: 'Data not found with this month' });
          return;
      }
      res.json(results);
  });
});

// Endpoint to get a specific month's and year's amount
app.get('/earnings/month/:month/year/:year/:userId', (req, res) => {
const { month, year, userId } = req.params;
console.log(" Server.js Month: " + month + "year: " + year + " user id: " + userId);
connection.query('SELECT amount FROM earnings WHERE month = ? AND year = ? AND user_id = ?', [month, year, userId], (error, results) => {
    if (error) {
        console.error('Error retrieving: '+ error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.length === 0) {
        res.status(404).json({ error: 'Data not found with this month and year' });
        return;
    }
    console.log("Results from month and year : " +results);
    res.json(results);
});
});


// Endpoint to get all earnings for different months
app.get('/earnings/:diff/:userId', async(req, res) => {
  const { diff, userId } = req.params;
  console.log("User id:  " + userId);
  const queryString = "SELECT year, month, amount, user_id, month_difference FROM ( "
  + "SELECT year, month, amount, user_id, (MONTH(CURDATE()) - MONTH(STR_TO_DATE(month, '%M')) + 12) % 12 AS month_difference FROM earnings) AS m_diff"
  + " WHERE month_difference > 0 AND month_difference <= ? AND user_id = ? ORDER BY STR_TO_DATE(month, '%M') DESC;";
  connection.query(queryString, [diff, userId], function(error, results, fields){
      if(error){
        console.log("Error: " + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
  });
});

// End point to insert month earnings
app.post('/earnings/:userId', (req, res) => {
const { userId } = req.params;
const { months, amount, years } = req.body;
console.log("Month : " + months + " amount: " + amount);
  if (!months || !amount || !years) {
      return res.status(400).json({ error: 'Month, year and amount are required' });
  }

  // Insert new earnings data into the database
  connection.query('INSERT INTO earnings (month, amount, year, user_id) VALUES (?,?,?,?)', [months, amount, years, userId], (error, results) => {
      if (error) {
          console.error('Error inserting into database:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json({ message: 'Earnings and month added successfully' });
  });
});


// Endpoint to update a amount's value
app.put('/earnings/month/:month/year/:year/:userId', async (req, res) => {
const { month, year, userId } = req.params;
const { amount } = req.body;
console.log(" from server.js put : month: " + month + "year: " + year + " amount: " + amount);
if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
}

// Update earnings's value in the database
connection.query('UPDATE earnings SET amount = ? WHERE month = ? AND year = ? AND user_id = ?', [amount, month, year, userId], async (error, results) => {
    if (error) {
        console.error('Error updating database: ' + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Both month and year not found' });
        return;
    }
    res.json({ message: 'Monthly earnings updated successfully' });
});
});

// Endpoint to earnings expenditure data
app.delete('/earnings/:month/:userId', (req, res) => {
const { month, userId } = req.params;

// Delete the earnings data from the database
connection.query('DELETE FROM earnings WHERE month = ? AND user_id = ?', [month, userId], (error, results) => {
    if (error) {
        console.error('Error deleting from database:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Month not found' });
        return;
    }
    res.json({ message: 'Monthly earnings deleted successfully' });
});
});

//Allocated Budget API's
// Endpoint to get all allocated_budget items
app.get('/budget/items/:userId', async(req, res) => {
  const { userId } = req.params;
  connection.query('SELECT * FROM allocated_budget WHERE user_id = ?', [userId], function(error, results, fields){
      if(error){
        console.log("Error: " + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
  });
});

// Endpoint to get all budget items for different number of months
app.get('/budget/items/month/:diff/:userId', async(req, res) => {
  const { diff, userId } = req.params;
  console.log("Diff: " + diff + " and user id: " + userId);
  const queryString = "SELECT * FROM allocated_budget WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) > 0 AND TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) <= ? "
  + " AND user_id = ? ORDER BY monthAndYear DESC;";
  connection.query(queryString, [diff, userId], function(error, results, fields){
  if(error){
    console.log("Error: " + error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  console.log("Results : " + results);
      res.json(results);
  });
  });

app.get('/budget/items/amount/:diff/:userId', async(req, res) => {
const { diff, userId } = req.params;
const queryString = "SELECT *, SUM(amount) as amount FROM allocated_budget WHERE TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) > 0 AND TIMESTAMPDIFF(MONTH, monthAndYear, CURDATE()) <= ? "
+ " AND user_id = ? GROUP BY MONTH(monthAndYear) ORDER BY monthAndYear DESC;";
connection.query(queryString, [diff, userId], function(error, results, fields){
    if(error){
      console.log("Error: " + error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
});
});

// Endpoint to get a specific label's value for an allocated_budget
app.get('/budget/items/:item/:userId', (req, res) => {
console.log("Server.js label's item");
const { item, userId } = req.params;
connection.query('SELECT value FROM allocated_budget WHERE expenseType = ? AND user_id = ?', [item, userId], (error, results) => {
    if (error) {
        console.error('Error retrieving: '+ error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.length === 0) {
        res.status(404).json({ error: 'Label not found' });
        return;
    }
    res.json(results);
});
});

// End point to get current month total (expense) budget
app.get('/budget/items/budget/total/:userId', (req, res) => {
  const { userId } = req.params;
  console.log("server.js: calling to get allocated_budget");
  connection.query('SELECT SUM(amount) as total_expense FROM allocated_budget WHERE YEAR(monthAndYear) = YEAR(CURDATE()) AND MONTH(monthAndYear) = MONTH(CURDATE()) AND user_id = ?', [userId], (error,results) => {
    if (error) {
      console.error('Error retrieving: ' + error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log("results: " + results[0]);
    res.json(results);
  })
})

// End point to insert items
app.post('/budget/items/:userId', (req, res) => {
  console.log("request body: " + req.body);
  //const {label, value} = req.body;
  const { userId } = req.params;
  const {date, expenseType, amount} = req.body;
  console.log("Label: " + expenseType + " value : " + amount + " Month and Year: " + date);
    if (!expenseType || amount <= 0) {
        return res.status(400).json({ error: 'Both budget type and amount are required' });
    }

    // Insert new budget data into the database
    connection.query('INSERT INTO allocated_budget (monthAndYear, expenseType, amount, user_id) VALUES (?, ?, ?, ?)', [date, expenseType, amount, userId], (error, results) => {
        if (error) {
            console.error('Error inserting into database:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Budget data inserted successfully' });
    });
});


// Endpoint to update a expenseType's value in budget
app.put('/budget/items/:item/:userId', async (req, res) => {
const { item, userId } = req.params;
const { amount } = req.body;

console.log(" put budget: Label : " + item + " params label: " + req.params.item);
if (!amount) {
    return res.status(400).json({ error: 'Value is required' });
}

// Update label's value in the budget database
connection.query('UPDATE allocated_budget SET amount = ? WHERE expenseType = ? AND user_id = ?', [amount, item, userId], async (error, results) => {
    if (error) {
        console.error('Error updating database: ' + error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Label not found' });
        return;
    }
    res.json({ message: 'budget data updated successfully' });
});
});

// Endpoint to delete budget data
app.delete('/budget/items/:item/:userId', (req, res) => {
const { item } = req.params;

// Delete the budget data from the database
connection.query('DELETE FROM allocated_budget WHERE expenseType = ? AND user_id = ?', [item, userId], (error, results) => {
    if (error) {
        console.error('Error deleting from database:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Label not found' });
        return;
    }
    res.json({ message: 'Budget data deleted successfully' });
});
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
