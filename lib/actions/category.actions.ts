'use server'

import { CreateCategoryParams } from "@/types"
import { connectToDatabase } from "../database/intex"
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async({ categoryName }:
    CreateCategoryParams) => {
        try{
            await connectToDatabase();

            const newCtegory = await Category.create({ name: categoryName });

            return JSON.parse(JSON.stringify(newCtegory));
        
        } catch (error) {
            handleError(error)
        }
    }

 export const getAllCategories = async() => {
            try{
                await connectToDatabase();
    
                const categories = await Category.find();
    
                return JSON.parse(JSON.stringify(categories));
            
            } catch (error) {
                handleError(error)
            }
        }

            
