import { provideWidgetClass } from 'scrivito'

export const QuicksightDashboardWidget = provideWidgetClass(
  'QuicksightDashboardWidget',
  { attributes: { dashboardId: 'string' } },
)

export type QuicksightDashboardWidgetInstance = InstanceType<
  typeof QuicksightDashboardWidget
>
