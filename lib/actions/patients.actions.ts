"use server"

import { ID, Query } from "node-appwrite"
import { parseStringify } from "../utils"
import { users } from "../appwrite.config"

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
      
    }
  } catch (error) {
    console.log(error)
  }
}