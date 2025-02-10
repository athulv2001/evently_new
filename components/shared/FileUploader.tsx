// import React, { Dispatch, SetStateAction, useCallback } from 'react';
// import { useDropzone } from '@uploadthing/react';

// type FileUploadProps = {
//   imageUrl: string; // URL for the uploaded image
//   onFieldChange: (value: string) => void; // Callback to handle field change
//   setFiles: Dispatch<SetStateAction<File[]>>; // State for uploaded files
// };

// const FileUploader: React.FC<FileUploadProps> = ({ imageUrl, onFieldChange, setFiles }) => {
  
//   // Handle dropped files
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles(acceptedFiles); // Set the accepted files
//     onFieldChange(acceptedFiles[0].name); // Call the field change function (name of the file)
//   }, [setFiles, onFieldChange]);

//   // Setup Dropzone with acceptable file types for images
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: ['image/jpeg', 'image/png', 'image/jpg'], // Accept only image files
//     multiple: false, // Only one file at a time
//   });

//   return (
//     <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
//       <input {...getInputProps()} />
//       {imageUrl ? (
//         <div>
//           <img
//             src={imageUrl}
//             alt="Uploaded preview"
//             className="w-32 h-32 object-cover mx-auto"
//           />
//         </div>
//       ) : (
//         <p>Drop files here or click to upload</p>
//       )}
//     </div>
//   );
// };

// export default FileUploader;
