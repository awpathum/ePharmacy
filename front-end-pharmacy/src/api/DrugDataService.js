import Axios from "axios"

let restApiUrl = 'http://localhost:8080/'
class DrugDataService {

    

    retrieveAllDrugs(){
        return Axios.get(`${restApiUrl}/drug/`)

     }

     retrieveDrugById(id){
         return Axios.get(`${restApiUrl}/drug/${id}`)
     }

     updateDrug(id){
        return Axios.put(`${restApiUrl}/drug/${id}`)
     }

     //cannot delete sql thows an error because of forign keys

    //  deleteDrug(id){
    //      console.log(`http://localhost:8080/supplier/${id}`)
    //     return Axios.delete(`http://localhost:8080/supplier/${id}`)
    //  }

}
export default new DrugDataService