import { QdrantClient } from "@qdrant/js-client-rest";

const url = process.env.QDRANT_URL || "http://localhost:6333";
const apiKey = process.env.QDRANT_API_KEY;

export const qdrant = new QdrantClient({ url, apiKey });

const VECTOR_SIZE = 384; // all-MiniLM-L6-v2
const COLLECTION_NAME = "edu_chunks";

export async function ensureCollection() {
  const exists = await qdrant.collectionExists(COLLECTION_NAME);
  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: { size: VECTOR_SIZE, distance: "Cosine" },
    });
  }
}