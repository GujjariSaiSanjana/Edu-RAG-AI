import { qdrant, COLLECTION_NAME } from "../config/qdrant";
import { randomUUID } from "crypto";

export async function insertVectors(
  chunks: { content: string; pageNumber: number; embedding: number[] }[]
) {
  const points = chunks.map(c => ({
    id: randomUUID(),
    vector: c.embedding,
    payload: { content: c.content, page: c.pageNumber },
  }));
  await qdrant.upsert(COLLECTION_NAME, { wait: true, points });
  return points.map(p => p.id);
}

export async function searchSimilar(
  queryEmbedding: number[],
  topK = 5
) {
  const res = await qdrant.search(COLLECTION_NAME, {
    vector: queryEmbedding,
    limit: topK,
    with_payload: true,
  });
  return res.map(r => ({
    content: r.payload!.content as string,
    page: r.payload!.page as number,
    score: r.score!,
  }));
}