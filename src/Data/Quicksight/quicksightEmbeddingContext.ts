import {
  createEmbeddingContext,
  EmbeddingContext,
} from 'amazon-quicksight-embedding-sdk'

let contextPromise: Promise<EmbeddingContext> | undefined

export function getQuicksightEmbeddingContext(): Promise<EmbeddingContext> {
  if (!contextPromise) contextPromise = createEmbeddingContext()
  return contextPromise
}
