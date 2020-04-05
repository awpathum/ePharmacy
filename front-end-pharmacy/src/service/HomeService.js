import Axios from "axios";

class HomeService{

    executeHelloWorldService(){
        return  Axios.get('http://134.209.145.176:8080/hello')
        //console.log('executed service')
    }


}
export default new HomeService;