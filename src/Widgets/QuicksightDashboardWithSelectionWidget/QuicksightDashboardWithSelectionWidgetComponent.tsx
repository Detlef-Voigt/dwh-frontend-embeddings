import { useEffect, useState } from 'react'
import { connect, provideComponent, WidgetTag } from 'scrivito'
import { QuicksightDashboardWithSelectionWidget } from './QuicksightDashboardWithSelectionWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'
import { Loading } from '../../Components/Loading'
import { QuicksightDashboardEmbed } from '../../Components/QuicksightDashboardEmbed'
import {
  fetchQuicksightDashboards,
  QuicksightDashboard,
} from '../../Data/Quicksight/fetchQuicksightDashboards'

provideComponent(QuicksightDashboardWithSelectionWidget, ({ widget }) => (
  <WidgetTag>
    <QuicksightDashboardSelection
      initialDashboardId={widget.get('dashboardId')}
    />
  </WidgetTag>
))

const QuicksightDashboardSelection = connect(
  function QuicksightDashboardSelection({
    initialDashboardId,
  }: {
    initialDashboardId: string | null
  }) {
    const [dashboards, setDashboards] = useState<
      QuicksightDashboard[] | null
    >(null)
    const [error, setError] = useState<unknown>(null)
    const [selectedDashboardId, setSelectedDashboardId] = useState<
      string | null
    >(null)

    useEffect(() => {
      let cancelled = false

      fetchQuicksightDashboards()
        .then((fetchedDashboards) => {
          if (cancelled) return
          setDashboards(fetchedDashboards)
          setSelectedDashboardId(
            (initialDashboardId &&
            fetchedDashboards.some((d) => d.id === initialDashboardId)
              ? initialDashboardId
              : fetchedDashboards[0]?.id) ?? null,
          )
        })
        .catch((e) => {
          if (!cancelled) setError(e)
        })

      return () => {
        cancelled = true
      }
    }, [initialDashboardId])

    if (error) return <DataErrorEditorNote error={error} />
    if (!dashboards) return <Loading />
    if (dashboards.length === 0) {
      return <EditorNote>No dashboards are available to select.</EditorNote>
    }

    return (
      <>
        <select
          className="form-select mb-3"
          value={selectedDashboardId ?? ''}
          onChange={(e) => setSelectedDashboardId(e.target.value)}
        >
          {dashboards.map((dashboard) => (
            <option value={dashboard.id} key={dashboard.id}>
              {dashboard.name}
            </option>
          ))}
        </select>
        {selectedDashboardId && (
          <QuicksightDashboardEmbed dashboardId={selectedDashboardId} />
        )}
      </>
    )
  },
  { loading: Loading },
)
