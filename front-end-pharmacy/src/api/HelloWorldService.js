import Axios from "axios"

class HelloWorldService{
    executeHelloWorldService(){
       return Axios.get('http://localhost:8080/hello')
    }
}

export default new HelloWorldService()