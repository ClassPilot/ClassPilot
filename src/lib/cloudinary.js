// Cloudinary configuration - these should be set in your .env file
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'classpilot-avatars';

/**
 * Upload image to Cloudinary using browser-compatible API
 * @param {File} file - The image file to upload
 * @param {string} folder - The folder to upload to (optional)
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file, folder = 'classpilot-avatars') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    // Optional: only include folder if your unsigned preset allows it
    if (folder) formData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cloudinary upload error:', errorData);
      
      const message = errorData?.error?.message || 'Unknown error';
      if (message.toLowerCase().includes('upload preset')) {
        throw new Error('Upload preset not found. Create an unsigned preset matching VITE_CLOUDINARY_UPLOAD_PRESET and retry.');
      }
      throw new Error(`Failed to upload image to Cloudinary: ${message}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary (requires server-side implementation)
 * Note: This function requires server-side API key for security
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    // This would need to be implemented on your backend for security
    // as it requires the API secret which should not be exposed to the client
    console.warn('Delete functionality requires server-side implementation');
    return false;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - The Cloudinary URL
 * @returns {string} - The public ID
 */
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;
  
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  return publicId;
};

/**
 * Validate if a URL is a valid Cloudinary URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid Cloudinary URL
 */
export const isValidCloudinaryUrl = (url) => {
  return url && url.includes('cloudinary.com') && url.includes('image/upload');
};
