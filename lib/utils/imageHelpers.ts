import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Helper to convert storage IDs to UploadedImage format for editing
export async function convertStorageIdsToUploadedImages(
  storageIds: string[],
  convexClient: ConvexHttpClient
): Promise<Array<{ storageId: string; url: string; file: File }>> {
  if (!storageIds || storageIds.length === 0) return [];

  try {
    const imagePromises = storageIds.map(async (storageId) => {
      // Get URL from Convex storage
      const url = await convexClient.query(api.files.getFileUrl, { 
        storageId: storageId as any 
      });
      
      if (!url) return null;

      // Create a placeholder File object for display purposes
      // In a real scenario, we might not need the actual File object for editing
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], `image-${storageId}.jpg`, { type: blob.type });

      return {
        storageId,
        url,
        file,
      };
    });

    const results = await Promise.all(imagePromises);
    return results.filter(Boolean) as Array<{ storageId: string; url: string; file: File }>;
  } catch (error) {
    console.error("Error converting storage IDs to uploaded images:", error);
    return [];
  }
}

// Helper to extract storage IDs from UploadedImage array
export function extractStorageIds(images: Array<{ storageId: string; url: string; file: File }>): string[] {
  return images.map(img => img.storageId);
}
