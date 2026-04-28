/**
 * Normalizes an image URL to ensure it works across all routes.
 * Handles local relative paths by converting them to absolute paths.
 * Returns the URL as is if it's already an external link.
 * 
 * @param {string} url - The image URL or path
 * @returns {string} - The normalized absolute URL or path
 */
export const getImageUrl = (url) => {
  if (!url) return '';
  
  // If it's already a full URL (Supabase storage or external)
  if (url.startsWith('http')) {
    return url;
  }
  
  // Handle relative paths starting with ./ or ../
  let cleanPath = url;
  if (url.startsWith('./')) {
    cleanPath = url.substring(2);
  } else if (url.startsWith('../')) {
    // This is less common in this project but good to handle
    cleanPath = url.substring(3);
  }
  
  // Ensure it starts with a leading slash for root-relative resolving
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  return cleanPath;
};
