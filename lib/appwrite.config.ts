import * as sdk from "node-appwrite";
// import dotenv from "dotenv";

// dotenv.config();

// export const { 
//     PROJECT_ID, 
//     API_KEY, 
//     PATIENT_COLLECTION_ID, 
//     DOCTOR_COLLECTION_ID, 
//     APPOINTMENT_COLLECTION_ID, 
//     NEXT_PUBLIC_BUCKET_ID: BUCKET_ID, 
//     NEXT_PUBLIC_ENDPOINT: ENDPOINT 
// } = process.env;

// if (!process.env.NEXT_PUBLIC_ENDPOINT) {
//     console.log(ENDPOINT)
//     throw new Error("ENDPOINT environment variable is not correctly set");
    
// }

// if (!process.env.PROJECT_ID) {
//     throw new Error("PROJECT_ID environment variable not correctly set");
// }

// if (!process.env.API_KEY) {
//     throw new Error("API_KEY environment variable not correctly set");
// }

const client = new sdk.Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.PROJECT_ID!)
    .setKey(process.env.API_KEY!)
    
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
