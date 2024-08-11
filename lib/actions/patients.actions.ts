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
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      )
      file = await storage.createFile(process.env.BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env.ENDPOINT}/storage/buckets/${process.env.BUCKET_ID}/files/${file?.$id}/view?project=${process.env.PROJECT_ID}`,
        ...patient
      }
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.log(error)
  }
}