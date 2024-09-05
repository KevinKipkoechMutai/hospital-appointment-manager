"use server"

import { ID, Query } from "node-appwrite"
import { parseStringify } from "../utils"
import { databases, storage, users } from "../appwrite.config"
import { InputFile } from "node-appwrite/file"

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    // console.log('Creating user with:', user)
    // console.log('Users client:', users)
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    
    // console.log(newuser)
    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)
    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}


export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    // Handle file upload if the identification document is provided
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      );

      try {
        // Upload the file and get its ID and URL
        file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
        console.log("File upload successful:", file);
      } catch (fileUploadError) {
        console.error("Error uploading file:", fileUploadError);
        throw new Error("File upload failed");
      }
    }

    // Prepare patient data for creation
    const newPatientData = {
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: file
        ? `${process.env.ENDPOINT!}/storage/buckets/${process.env.BUCKET_ID!}/files/${file.$id}/view?project=${process.env.PROJECT_ID!}`
        : null,
      ...patient,
    };

    console.log("Creating new patient with data:", newPatientData);

    // Create the patient document in the database
    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      newPatientData
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error; // Re-throw error for handling in the calling function
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [
        Query.equal('userId', userId)
      ]
    )
    return parseStringify(patients.documents[0])
  } catch (error) {
    console.log(error)
  }
}