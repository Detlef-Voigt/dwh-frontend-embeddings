import { provideWidgetClass } from 'scrivito'

export const QuicksightDashboardWithSelection2Widget = provideWidgetClass(
  'QuicksightDashboardWithSelection2Widget',
  { attributes: { dashboardId: 'string' } },
)

export type QuicksightDashboardWithSelection2WidgetInstance = InstanceType<
  typeof QuicksightDashboardWithSelection2Widget
>
