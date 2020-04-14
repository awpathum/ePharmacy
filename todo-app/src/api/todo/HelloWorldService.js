import Axios from 'axios'
class HelloWorldService{
    executeHelloWorldService(){
        return  Axios.get('http://localhost:8080/hello-world')
        //console.log('executed service')
    }


    executeHelloWorldBeanService(){
        return  Axios.get('http://localhost:8080/hello-world-bean')
        //console.log('executed service')
    }

    executeHelloWorldPathVariableService(name){

        // let username = 'mamba'
        // let password = 'mamba123'
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return  Axios.get(`/hello-world/path-variable/${name}`)
        //console.log('executed service')
    }
}

export default new HelloWorldService()