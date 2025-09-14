import { APPS_SCRIPT_URL } from '../constants';

/**
 * Submits a string of links to the specified Google Apps Script endpoint.
 * @param links A string containing links, typically separated by newlines.
 * @returns A promise that resolves when the request is sent.
 */
export const submitLinks = async (links: string): Promise<void> => {
  // Google Apps Script's doPost(e) function expects form data.
  // URLSearchParams creates a body with 'application/x-www-form-urlencoded' content type.
  const body = new URLSearchParams({ links });

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: body,
      // This mode is a common workaround for CORS issues with Google Apps Script.
      // It allows sending the data but prevents the client from reading the response,
      // which is acceptable for a "fire-and-forget" operation like this.
      mode: 'no-cors',
    });
    // With 'no-cors', we cannot read the response to confirm success.
    // We proceed by assuming the submission was successful if the fetch call itself
    // does not throw a network-level error (e.g., DNS failure, no internet).
  } catch (error) {
    // This will catch genuine network errors, but not CORS-related response blocking.
    console.error("Fetch failed due to a network error:", error);
    throw new Error("Error de red. Asegúrate de tener conexión a internet.");
  }
};
