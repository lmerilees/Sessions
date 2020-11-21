const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'elmntree',
    database: 'sessions',
    password: 'Stanton123',
    port: 5433,
    insecureAuth: true
});


const getUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const {user_id, user_password} = body
        pool.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [
            user_id, user_password
        ], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

const getProfile = (body) => {
    return new Promise(function (resolve, reject) {
        const {user_id} = body
        pool.query('SELECT * FROM users WHERE user_name = $1', [user_id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

const createUser = (body) => {
    return new Promise(function (resolve, reject) {
        const {user_id, user_password} = body
        pool.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', [
            user_id, user_password
        ], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results)
        })
    })
}

const getSpots = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM spots ORDER BY spot_name', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results)
        })
    })
}

const getPosts = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM posts ORDER BY post_id DESC', (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(results)
        })
    })
}

const createSpot = (body) => {
    return new Promise(function (resolve, reject) {
        const {
            spot_name,
            location,
            image,
            details,
            rating,
            security,
            obstacles,
            challenges
        } = body
        pool.query('INSERT INTO spots (spot_name, location, image, details, security, obstacles, challenges) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
            spot_name,
            location,
            image,
            details,
            security,
            obstacles,
            challenges
        ], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(results)
        })
    })
}

const modifyProfile = (body) => {
    return new Promise(function (resolve, reject) {
        const {
            image,
            age,
            stance,
            location,
            board,
            trucks,
            wheels,
            bearings,
            shoes,
            favourite_clip,
            user_name
        } = body
        pool.query('UPDATE users SET image = $1, age = $2, stance = $3, location = $4, board = $5, trucks = $6, wheels = $7, bearings = $8, shoes = $9, favourite_clip = $10 WHERE user_name = $11 RETURNING *', [
            image,
            age,
            stance,
            location,
            board,
            trucks,
            wheels,
            bearings,
            shoes,
            favourite_clip,
            user_name
        ], (error, results) => {
            if (error) { // console.log(error);
                reject(error)
            }
            // console.log(results);
            resolve(results)
        })
    })
}

const updateRep = (body) => {
    return new Promise(function (resolve, reject) {
        const {reputation, user_name} = body
        pool.query('UPDATE users SET reputation = $1 WHERE user_name = $2 RETURNING *', [
            reputation, user_name
        ], (error, results) => {
            if (error) { // console.log(error);
                reject(error)
            }
            // console.log(results);
            resolve(results)
        })
    })
}

const updateLikes = (body) => {
    return new Promise(function (resolve, reject) {
        const {likes, post_id} = body
        pool.query('UPDATE posts SET likes = $1 WHERE post_id = $2 RETURNING *', [
            likes, post_id
        ], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            // console.log(results);
            resolve(results)
        })
    })
}

const updateDislikes = (body) => {
    return new Promise(function (resolve, reject) {
        const {dislikes, post_id} = body
        pool.query('UPDATE posts SET dislikes = $1 WHERE post_id = $2 RETURNING *', [
            dislikes, post_id
        ], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            // console.log(results);
            resolve(results)
        })
    })
}

const updateRating = (body) => {
    return new Promise(function (resolve, reject) {
        const {rating, spot_name} = body
        pool.query('UPDATE spots SET rating = $1 WHERE spot_name = $2 RETURNING *', [
            rating, spot_name
        ], (error, results) => {
            if (error) { // console.log(error);
                reject(error)
            }
            // console.log(results);
            resolve(results)
        })
    })
}

const createPost = (body) => {
    return new Promise(function (resolve, reject) {
        const {post_name, post_body, user_name} = body
        pool.query('INSERT INTO posts (post_name, post_body, user_name) VALUES ($1, $2, $3) RETURNING *', [
            post_name, post_body, user_name
        ], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
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
    updateRep,
    updateRating,
    createPost,
    getPosts,
    updateLikes,
    updateDislikes
}
