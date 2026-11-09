import { createRestApiClient, getInstanceId } from 'scrivito'

// TODO: replace with the real auth mechanism for the DWH Analytics Embedding
// API once decided (e.g. Scrivito's authViaInstance/performWithIamToken, or a
// static API key from an env var).
function authorizationHeader(): string | null {
  return null
}

export function quicksightDashboardsClient() {
  const baseUrl: string = import.meta.env.DWH_ANALYTICS_EMBEDDING_API_URL
  const authorization = authorizationHeader()
  return createRestApiClient(
    `${baseUrl}/instance/${getInstanceId()}/v1/dashboards`,
    authorization ? { headers: { Authorization: authorization } } : undefined,
  )
}
