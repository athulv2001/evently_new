import React, { startTransition, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Category, { ICategory } from '@/lib/database/models/category.model'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { AlertDialogAction } from '../ui/alert-dialog'
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
        
    }

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

            <Dialog>
            <DialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Open</DialogTrigger>
            <DialogContent className='bg-white'>
                <DialogHeader>
                <DialogTitle>New Category</DialogTitle>
                <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}></AlertDialogAction>
                <DialogDescription>
                    <Input type='text' placeholder='Category name' className='input-field mt-3' onChange={(e)=>setNewCategory(e.target.value)} />
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

        </SelectContent>
</Select>

  )
}

export default DropDown
