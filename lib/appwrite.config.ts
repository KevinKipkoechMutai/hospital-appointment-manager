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
// } = process.env

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

const endpoint = 'https://cloud.appwrite.io/v1'         //NOW PUBLIC
const projectID = '669113640029435fd336' //NOW PUBLIC
const apiKey = 'b94d8b226b8eedd00ecd164dbeeb0d407a4100ab2fad50cef69a815c764548ae9625e957041e5fa78b01e4b37de3b1ff570ca69bfdbccdd6189d51390a7c9dbc1a95d56e8b4a4ce6f8f5d43ecc3529199af627fc1eb5c57448248e0c1c577921082c0620ce876a8ff59837205bbc0d210374837764dd64495bdec12f68dfac14'  //NOW PUBLIC

const client = new sdk.Client();

client
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setKey(apiKey)
    
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
