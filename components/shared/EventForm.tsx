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
// import { useUploadThing } from '@/lib/uploadthing';
import { UploadDropzone } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/actions/event.actions';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { ClientUploadedFileData } from "uploadthing/types";
import { FileUpload } from "@/components/file-upload";

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [isFileUploadFailed, setIsFileUploadFailed] = useState({
    status: false,
    error: "",
  });
     
  

  const initialValues = eventDefaultValues;
  // const { startUpload } = useUploadThing('imageUploader')
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const uploadedImageUrl = values.imageUrl;
    
    if (!uploadedImageUrl) {
      console.log("Image upload is still in progress or failed. Please try again.");
      return;
    }

    console.log('FINAL IMG URL: ', uploadedImageUrl );

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: {...values, imageUrl: uploadedImageUrl},
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
        
      } catch (error) {
        console.log(error)
        
      }
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
        onSubmit,
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
          <FormField 
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                  <FormItem>
                      <FormControl>
                          <FileUpload 
                              endpoint="serverImage"
                              value={field.value}
                              onChange={field.onChange}
                              setIsFileUploadFailed={(status: boolean, error: string) => {
                                setIsFileUploadFailed({ status, error });
                              }}
                          />
                      </FormControl>
                      <FormMessage />
                      {isFileUploadFailed.status && (
                      <label className="text-red-700 mt-1">
                          {isFileUploadFailed?.error}
                      </label> 
                      )}
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

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                    <DatePicker 
                      selected={field.value} 
                      onChange={(date: Date | null) => field.onChange(date)} // Fix: Allow null
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                    <DatePicker 
                      selected={field.value} 
                      onChange={(date: Date | null) => field.onChange(date)} // Fix: Allow null
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
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
