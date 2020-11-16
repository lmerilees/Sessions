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
        resolve(results);
      })
    }) 
  }

  const getProfile = (body) => {
    return new Promise(function(resolve, reject) {
      const { user_id } = body
      pool.query('SELECT * FROM users WHERE user_name = $1', [user_id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
    }) 
  }

  const createUser = (body) => {
    return new Promise(function(resolve, reject) { 
      const { user_id, user_password } = body
      pool.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', [user_id, user_password], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  const getSpots = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT spot_name FROM spots', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }
  
  const createSpot = (body) => {
    return new Promise(function(resolve, reject) { 
      const { spot_name, location, image, details, rating, security, obstacles, challenges } = body
      pool.query('INSERT INTO spots (spot_name, location, image, details, rating, security, obstacles, challenges) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [spot_name, location, image, details, rating, security, obstacles, challenges], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  const modifyProfile = (body) => {
    return new Promise(function(resolve, reject) { 
      const { image, reputation, age, stance, location, board, trucks, wheels, bearings, shoes, favourite_clip, user_name } = body
      pool.query('UPDATE users SET image = $1, age = $2, stance = $3, location = $4, board = $5, trucks = $6, wheels = $7, bearings = $8, shoes = $9, favourite_clip = $10 WHERE user_name = $11 RETURNING *', [image, age, stance, location, board, trucks, wheels, bearings, shoes, favourite_clip, user_name], (error, results) => {
        if (error) {
          //console.log(error);
          reject(error)
        }
        //console.log(results);
        resolve(results)
      })
    })
  }

  const updateRep = (body) => {
    return new Promise(function(resolve, reject) { 
      const { reputation, user_name } = body
      pool.query('UPDATE users SET reputation = $1 WHERE user_name = $2 RETURNING *', [reputation, user_name], (error, results) => {
        if (error) {
          //console.log(error);
          reject(error)
        }
        //console.log(results);
        resolve(results)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    getSpots,
    createSpot,
    getProfile,
    modifyProfile,
    updateRep
  }