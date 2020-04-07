import Axios from "axios"

let restApiUrl = 'hrrp://localhost:8080/'
class DrugDataService {

    

    retrieveAllDrugs(){
        return Axios.get(`${restApiUrl}/supplier/`)

     }

     //cannot delete sql thows an error because of forign keys

    //  deleteDrug(id){
    //      console.log(`http://localhost:8080/supplier/${id}`)
    //     return Axios.delete(`http://localhost:8080/supplier/${id}`)
    //  }

}
export default new DrugDataService