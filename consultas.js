const {
  Pool
} = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "qwer1234",
  database: "likeme",
  port: 5432
})

const generarQuery = (name, text, values) => {
  return {
    name,
    text,
    values
  }
}

const insertar = async (datos) => {

  console.log(datos);

  const name = "insertar"
  const text = "INSERT INTO posts (usuario, url, descripcion, likes) values($1, $2, $3, 0)"
  const values = datos

  try {
    const result = await pool.query(generarQuery(name, text, values))
    return result
  } catch (error) {
    console.log(error.code)
    console.log(error);
    return error
  }
}

const like = async (datos) => {

  const name = "like"
  const text = "UPDATE posts SET likes= likes + 1 WHERE id=$1 RETURNING *"
  const values = datos

  try {
    const result = await pool.query(generarQuery(name, text, values))
    return result
  } catch (error) {
    console.log(error);
    return error
  }
}

const consultar = async () => {

  const name = "consultar"
  const text = "SELECT * FROM posts"
  const values = []

  try {
    const result = await pool.query(generarQuery(name, text, values))
    return result
  } catch (error) {
    console.log(error.code);
    return error
  }
}

module.exports = {
  insertar,
  like,
  consultar
}