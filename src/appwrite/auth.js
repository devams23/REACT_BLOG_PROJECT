import {Client , Account , ID } from "appwrite";
import config from "../../config/config";

export class AuthService{
    client = new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteurl) // Your API Endpoint
            .setProject(config.appwriteprojectid);
            
        this.account = new Account(this.client);

    }
    async signup({email, password, name }) {
        try {
            const registeracc =  await this.account.create(ID.unique() , email, password ,name);
            return this.signin({email , password})
            
        } catch (error) {
            console.log("auth service :: signup :: error ", error);
        }
    } 

    async signin({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            return error
            console.log("auth service :: signin :: error ", error);
        }
    }
    async signout(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            
        }
    }
    async getcurrentuser(){
        try {
          return await this.account.get();
        
        } catch (error) {
            console.log("auth service :: getcurrentuser :: error ", error);
        }
        return null;
    }
}; 

const authservice = new AuthService();
export default authservice;
