import React, { startTransition, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'

import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
 

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { handleError } from '@/lib/utils'

  
  

type DropdownProps ={
    value?:string
    onChangeHandler?: ()=> void
    
    

}

const DropDown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([
        
    ])

    const [NewCategory, setNewCategory] = useState('')
    const handleAddCategory =() =>{
        createCategory({
            categoryName: NewCategory.trim()
          })
            .then((category) => {
              setCategories((prevState) => [...prevState, category])
            })
    }

    useEffect(() => {
        const getCtegories = async () =>{
            const categoryList = await getAllCategories();

            categoryList && setCategories(categoryList as ICategory[])

        }

        getCtegories();
    }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            {categories.length > 0 && categories.map((Category) => (
                <SelectItem key={Category._id} value={Category._id} className='select-item p-regular-14'>
                    {Category.name}
                </SelectItem>
            ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        </SelectContent>
</Select>

  )
}

export default DropDown
