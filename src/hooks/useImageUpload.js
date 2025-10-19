import { useState } from "react";
import { blogApi } from "@/lib/api";
import { validateImageFile } from "@/lib/validation";
import { toast } from "react-toastify";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImages = async (files) => {
    const filesArray = Array.from(files);
    const uploadedUrls = [];
    const errors = [];

    // Validate all files first
    for (const file of filesArray) {
      const error = validateImageFile(file);
      if (error) {
        errors.push({ file: file.name, error });
      }
    }

    if (errors.length > 0) {
      errors.forEach(({ file, error }) => toast.error(`${file}: ${error}`));
      return { urls: [], success: false };
    }

    setUploading(true);
    setProgress(0);

    try {
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];

        try {
          const data = await blogApi.uploadImage(file);
          uploadedUrls.push(data.url);
          setProgress(((i + 1) / filesArray.length) * 100);
        } catch (error) {
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }

      return { urls: uploadedUrls, success: true };
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      return { urls: [], success: false };
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadImages, uploading, progress };
};
