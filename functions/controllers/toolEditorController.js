const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function to add an edit history entry to Firestore.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The body of the request containing the payload.
 * @param {number} req.body.timestamp - The timestamp of the edit history entry.
 * @param {string} req.body.content - The content of the edit history entry.
 * @param {string} req.body.type - The type of edit history entry (e.g., "initial", "auto-save", "manual-save", "restore").
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} Sends an HTTP response with the result of the operation.
 *
 * @throws {Error} Returns a 400 status code if required fields are missing in the payload.
 * @throws {Error} Returns a 500 status code for internal server errors.
 *
 * @example
 * // Example payload to send in the request body:
 * {
 *   "timestamp": 1672531200000,
 *   "content": "Updated markdown content",
 *   "type": "auto-save"
 * }
 *
 * // Example successful response:
 * {
 *   "id": "newDocumentId",
 *   "message": "Edit history added successfully"
 * }
 */
exports.addEditHistory = functions.https.onRequest(async (req, res) => {
  try {
    const { timestamp, content, type } = req.body;
    if (!timestamp || !content || !type) {
      return res.status(400).send("Missing required fields: timestamp, content, or type");
    }

    const docRef = await db.collection("editHistory").add({
      timestamp,
      content,
      type,
    });

    return res.status(200).send({ id: docRef.id, message: "Edit history added successfully" });
  } catch (error) {
    console.error("Error adding edit history:", error);
    return res.status(500).send("Internal Server Error");
  }
});
