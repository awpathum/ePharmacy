import Axios from 'axios'

class TodoDataService {
    retrieveAllTodos(name) {
        return Axios.get(`/users/${name}/todos`)
        //console.log('executed service')
    }

    deleteTodo(name, id) {
        console.log(`http://localhost:8080/users/${name}/todos/${id}`);
        return Axios.delete(`/users/${name}/todos/${id}`)
    }

    retrieveTodo(name, id) {
        return Axios.get(`/users/${name}/todos/${id}`)
        //console.log('executed service')
    }

    updateTodo(name, id, todo) {
        console.log(`http://localhost:8080/users/${name}/todos/${id}`);
        return Axios.put(`/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        //console.log(`http://localhost:8080/users/${name}/todos/${id}`);
        return Axios.post(`/users/${name}/todos/`, todo)
    }


}
export default new TodoDataService()