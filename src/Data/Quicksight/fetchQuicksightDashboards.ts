import { quicksightDashboardsClient } from './quicksightDashboardsClient'

export interface QuicksightDashboard {
  id: string
  name: string
}

export async function fetchQuicksightDashboards(): Promise<
  QuicksightDashboard[]
> {
  const client = quicksightDashboardsClient()
  const response = (await client.get('')) as {
    dashboards: QuicksightDashboard[]
  }
  return response.dashboards
}
