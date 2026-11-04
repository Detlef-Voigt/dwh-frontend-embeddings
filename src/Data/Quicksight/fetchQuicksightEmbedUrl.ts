import { createRestApiClient, getInstanceId } from 'scrivito'

export interface QuicksightEmbedUrl {
  embedUrl: string
  expiresAt: string
}

// TODO: replace with the real auth mechanism for the DWH Analytics Embedding
// API once decided (e.g. Scrivito's authViaInstance/performWithIamToken, or a
// static API key from an env var).
function authorizationHeader(): string | null {
  return null
}

export async function fetchQuicksightEmbedUrl(
  dashboardId: string,
): Promise<QuicksightEmbedUrl> {
  const baseUrl: string = import.meta.env.DWH_ANALYTICS_EMBEDDING_API_URL
  const authorization = authorizationHeader()
  const client = createRestApiClient(
    `${baseUrl}/instance/${getInstanceId()}/v1/dashboards`,
    authorization ? { headers: { Authorization: authorization } } : undefined,
  )

  const response = (await client.post(
    `/${encodeURIComponent(dashboardId)}/embed-url`,
  )) as { embed_url: string; expires_at: string }

  return { embedUrl: response.embed_url, expiresAt: response.expires_at }
}
