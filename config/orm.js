const connection = require('../config/connection');

// // Returns space separated question marks for sql query strings
function formatArrayForSql(arr, doubles=false) {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
        if(!doubles) newArr.push('?');
        if(doubles) newArr.push('??');
    }
    return newArr.join(',');
}

var orm = {
    // Returns all items from a table in the connected database
    selectAll: function(tableName, callback) {
        connection.query('SELECT * FROM ??', [ tableName ], (err, data) => {
            if(err) throw err;
            callback(data);
        });
    },
    
    // Inserts one row into a table in a database
    insertNew: function(tableName, keys, values, callback) {
        // Gets double-question marks for keys
        var doubleQ = formatArrayForSql(keys, true);
        // Gets single question-marks
        var singleQ = formatArrayForSql(values);
        // Builds our query
        var query = 'INSERT INTO ' + tableName + ' (' + doubleQ + ') VALUES(' + singleQ + ');';
        newArr = [];
        // Push all of our keys and values into one new array
        for(let i = 0; i<keys.length; i++) newArr.push(keys[i]);
        for(let i = 0; i<values.length; i++)  newArr.push(values[i]);
        
        // Runs the query
        connection.query(query, newArr, function(err, data) {
            if(err) throw err;
            callback(data);
        }); 
    },

    // Updates a field of a table in the database
    updateOne: function(tableName, idToUpdate, fieldToUpdate, valueToUpdate, callback) {
        connection.query('UPDATE ?? SET ?? = ? WHERE id = ?', [tableName, fieldToUpdate, valueToUpdate, idToUpdate], (err, data) => {
            if(err) throw err;
            callback(data);
        })
    }
}


module.exports = orm;