const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'elmntree',
  database: 'sessions',
  password: 'Stanton123',
  port: 5433,
  insecureAuth: true,
});

const getUsers= () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
    }) 
  }

  const createUser = (body) => {
    return new Promise(function(resolve, reject) { 
      const { userName, password } = body
      console.log(userName, password);
      pool.query('INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *', [userName, password], (error, results) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        resolve(`A new user has been added added: ${results}`)
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