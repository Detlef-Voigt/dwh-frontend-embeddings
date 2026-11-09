import { quicksightDashboardsClient } from './quicksightDashboardsClient'

export async function fetchQuicksightDashboardIds(): Promise<string[]> {
  const client = quicksightDashboardsClient()
  const response = (await client.get('')) as { dashboard_ids: string[] }
  return response.dashboard_ids
}
