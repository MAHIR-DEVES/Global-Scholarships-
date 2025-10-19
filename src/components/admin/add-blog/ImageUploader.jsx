import { useState } from "react";

export default function ImageUploader({
  label,
  maxImages = 2,
  onImagesChange,
  error,
}) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > maxImages) {
      setUploadError(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];

      setImages(newImages);
      onImagesChange(newImages);
    } catch (err) {
      setUploadError("Failed to upload images. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        <span className="text-sm text-gray-500 ml-2">
          (Max {maxImages} images)
        </span>
      </label>

      <div className="space-y-4">
        {/* Upload Button */}
        {images.length < maxImages && (
          <div>
            <label className="upload-btn">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
              <span className="flex items-center gap-2">
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Choose Images
                  </>
                )}
              </span>
            </label>
          </div>
        )}

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Errors */}
        {(uploadError || error) && (
          <p className="form-error">{uploadError || error}</p>
        )}
      </div>
    </div>
  );
}
