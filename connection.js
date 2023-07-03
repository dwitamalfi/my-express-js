const Pool = require('pg').Pool
const pool = new Pool({
  user: 'zikra',
  host: 'server.sto.live.apps360.id',
  database: 'dzikra_prod_01',
  password: 'zikra12345',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM mst_user ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNewUserPerDay = (request, response) => {
    pool.query("SELECT COUNT(id), DATE_TRUNC('day', created_at) AS tanggal FROM mst_user GROUP BY DATE_TRUNC('day', created_at) ORDER BY tanggal desc", (error, results)=>{
        if (error) {
            throw error
          }
        response.status(200).json(results.rows)
    })
}

const getNewUserPerMonth = (request, response) => {
    pool.query("SELECT COUNT(id), DATE_TRUNC('month', created_at) AS tanggal FROM mst_user GROUP BY DATE_TRUNC('month', created_at) ORDER BY tanggal desc", (error, results)=>{
        if (error) {
            throw error
          }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getUsers,
  getNewUserPerDay,
  getNewUserPerMonth
}