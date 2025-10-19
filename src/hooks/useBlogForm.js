import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { blogApi } from "@/lib/api";
import { validateBlogForm } from "@/lib/validation";
import { toast } from "react-hot-toast";

const initialFormState = {
  title: "",
  excerpt: "",
  contentHtml: "",
  coverImageUrl: [],
  categories: [],
  tags: [],
  status: "draft",
  publishedAt: "",
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
};

export const useBlogForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleSubmit = async (e, statusOverride) => {
    e?.preventDefault();

    const submitData = statusOverride
      ? { ...formData, status: statusOverride }
      : formData;

    // Validate form
    const validation = validateBlogForm(submitData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await blogApi.create(submitData);

      toast.success("Blog post created successfully!");

      // Redirect to blog detail or list page
      if (response.data?.slug) {
        router.push(`/admin/blogs/${response.data.slug}`);
      } else {
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Error creating blog:", error);

      // Handle validation errors from server
      if (error.errors && Array.isArray(error.errors)) {
        const serverErrors = {};
        error.errors.forEach((err) => {
          serverErrors[err.field || err.path] = err.message;
        });
        setErrors(serverErrors);
      }

      toast.error(error.message || "Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAsDraft = (e) => handleSubmit(e, "draft");
  const publish = (e) => handleSubmit(e, "published");

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    updateNestedField,
    handleSubmit,
    saveAsDraft,
    publish,
    resetForm,
    session,
  };
};
