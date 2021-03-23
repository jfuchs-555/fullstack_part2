import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  console.log('this is new Object', newObject)
  const request = axios.post(baseUrl, newObject)
  console.log('element was posted')
  return request.then(response => response.data)
}


const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
    console.log('this is id', id)
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('this is request', request)
  }

export default { getAll, create, update, deleteEntry}