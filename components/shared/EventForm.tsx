'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import DropDown from './Dropdown';
import { FileUploader } from './FileUploader'; // ✅ Uncommented for image upload
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from '../ui/checkbox';

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    console.log("Submitting form with values:", values);
    if (!userId) {
      console.error("Error: User ID is missing!");
      alert("User ID is required to submit the form.");
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: type === "Create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, userId }),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit form: ${errorText}`);
      }

      console.log("Event successfully submitted!", values);
      alert(`${type} event successful!`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong! Check the console for details.");
    }
  };

  function onSubmit(value: z.infer<typeof eventFormSchema>) {
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
        handleFormSubmit,
        (errors) => console.log("Validation errors:", errors)
        )} className="flex flex-col gap-5">
        
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Event Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event Title" {...field} className="border rounded-lg p-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Dropdown Field */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea placeholder="Description" {...field} className="border rounded-lg p-2 h-32" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Location Field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                    <Image 
                      src='/assets/icons/location-grey.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                    />
                    <Input placeholder="Event Location or Online" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Start Date Field */}
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                    <Image 
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Start Date:</p>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}  // Ensure it's a valid Date object
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'  // Handle null properly
                      dateFormat="yyyy-MM-dd HH:mm" 
                      wrapperClassName='datePicker' // Customize date format if necessary
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                    <Image 
                      src='/assets/icons/dollar.svg'
                      alt='dollar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <Input type='number' placeholder='Price' className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                  <Checkbox
                    // onCheckedChange={field.onChange}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    checked={field.value}
                  id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                </div>

              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />

        </div>
            
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
