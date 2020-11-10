const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'elmntree',
  database: 'sessions',
  password: 'Stanton123',
  port: 5433,
  insecureAuth: true,
});


const getUsers = (body) => {
    return new Promise(function(resolve, reject) {
      const { user_id, user_password } = body
      pool.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [user_id, user_password], (error, results) => {
        if (error) {
          reject(error)
        }
        //console.log(results.rows.length)
        resolve(results);
      })
    }) 
  }

  const createUser = (body) => {
    return new Promise(function(resolve, reject) { 
      const { user_id, user_password } = body
      console.log(user_id, user_password);
      pool.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', [user_id, user_password], (error, results) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        console.log(results);
        resolve(results)
      })
    })
  }

  const deleteUser = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
  }