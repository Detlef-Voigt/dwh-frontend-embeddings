import { quicksightDashboardsClient } from './quicksightDashboardsClient'

export interface QuicksightEmbedUrl {
  embedUrl: string
  expiresAt: string
}

export async function fetchQuicksightEmbedUrl(
  dashboardId: string,
): Promise<QuicksightEmbedUrl> {
  const client = quicksightDashboardsClient()

  const response = (await client.post(
    `/${encodeURIComponent(dashboardId)}/embed-url`,
  )) as { embed_url: string; expires_at: string }

  return { embedUrl: response.embed_url, expiresAt: response.expires_at }
}
