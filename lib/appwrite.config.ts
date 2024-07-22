import * as sdk from "node-appwrite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Access environment variables
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT; // Use `NEXT_PUBLIC_` for client-side
const projectID = process.env.PROJECT_ID; // Server-side
const apiKey = process.env.API_KEY; // Server-side

// Debugging: Log environment variables to ensure they are loaded correctly
if (typeof window === "undefined") {
  // This will log only on the server side
  console.log("Endpoint:", endpoint);
  console.log("Project ID:", projectID);
  console.log("API Key Length:", apiKey ? apiKey.length : 'undefined');
}

// Check if any environment variable is missing
if (!endpoint || !projectID || !apiKey) {
  throw new Error("Missing required environment variables");
}

// Initialize the Appwrite client
const client = new sdk.Client();
client
  .setEndpoint(endpoint) // Set your Appwrite Endpoint
  .setProject(projectID) // Set your project ID
  .setKey(apiKey); // Set your API key

// Export Appwrite services
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
