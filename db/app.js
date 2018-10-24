const { Pool } = require('pg')

const pool = new Pool({
  database: 'dbou0tbvgvmigk',
  user: 'mzpwcgfmduxtdm',
  password: 'bc062e477ec12aea4d17e9007bbc1f12d40497ada068f7e16b0efeb61dfec5d6',
  host: 'ec2-54-221-225-11.compute-1.amazonaws.com',
  port: 5432,
  ssl: true
})

//heroku pg:psql postgresql-metric-12079 --app pupcoe-thesis-management-t14


pool.connect().then(function() {
	console.log('connected to database')
}).catch(e => {
	if (e) {
		console.log('cannot connect to database')
	}
})

module.exports = {
	query: (text, callback) => {
		return pool.query(text, callback)
	}
}