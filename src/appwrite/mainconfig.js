import {Client , Databases , Storage , ID, Query} from "appwrite";
import config from "../../config/config";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteurl) // Your API Endpoint
            .setProject(config.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createpost ({title , details  ,featuredimage , status ,slug , userid}){
        try {
            return await this.databases.createDocument(
                config.appwritedatabaseid, // databaseId
                config.appwritecollectionid, // collectionId
                slug, // documentId
                {
                    title ,
                    details,
                    featuredimage,
                    status ,
                    userid,

                }, // data
                
            );
            
        } catch (error) {
            console.log("Service :: createpost :: error" , error);
        }
    } 

    async updatepost (slug,{title , details  ,featuredimage , status  }){
        try {
            return await this.databases.updateDocument(
                config.appwritedatabaseid, // databaseId
                config.appwritecollectionid, // collectionId
                slug, // document id
                {
                    title,
                    details,
                    featuredimage,
                    status,


                }, // data
                
            );
            
        } catch (error) {
            console.log("Service :: updatepost :: error" , error);
        }
    }

    async deletepost (slug){
        try {
             await this.databases.deleteDocument(
                config.appwritedatabaseid, // databaseId
                config.appwritecollectionid, // collectionId
                slug, // documentId
            );
            return true;
            
        } catch (error) {
            console.log("Service :: deletepost :: error" , error);
            return false;
        }
    }

    async getallposts() {
        try {
            return await this.databases.listDocuments(
                config.appwritedatabaseid, // databaseId
                config.appwritecollectionid, // collectionId
                [
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Service :: getallposts :: error", error);
            return false;
        }
    }
    

    async getpost (slug){
        try {
            return await this.databases.getDocument(
                config.appwritedatabaseid, // databaseId
                config.appwritecollectionid,// collectionId
                slug,
            );
            
            
        } catch (error) {
            console.log("Service :: getpost :: error" , error);
            return false;
        }
    }
    async uploadfile(file){
        try {
            return await this.storage.createFile(
                config.appwritebucketid, // bucketId
                ID.unique(), // fileId
                file, // name (optional)
                
            );
        } catch (error) {
            console.log("Service :: uploadfile :: error" , error);
            return false;
        }
    }
    async deletefile(fileid){
        try {
            await this.storage.deleteFile(
                config.appwritebucketid, // bucketId
                fileid // fileId
            );
            return true;
        } catch (error) {
            console.log("Service :: deletefile :: error" , error);
            return false;
        }
    }
    getfilepreview(fileid){
        try {
            return  this.storage.getFilePreview(
                config.appwritebucketid, // bucketId
                fileid, // fileId
            );
        } catch (error) {
            console.log("Service :: filepreview :: error" , error);
            return false;
        }
    }
};

const service = new Service();
export default service;