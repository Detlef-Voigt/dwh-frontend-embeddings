import { useEffect, useState } from 'react'
import { connect, provideComponent, WidgetTag } from 'scrivito'
import { QuicksightDashboardWithSelection2Widget } from './QuicksightDashboardWithSelection2WidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'
import { Loading } from '../../Components/Loading'
import { QuicksightDashboardEmbed } from '../../Components/QuicksightDashboardEmbed'
import {
  fetchQuicksightDashboards,
  QuicksightDashboard,
} from '../../Data/Quicksight/fetchQuicksightDashboards'

provideComponent(QuicksightDashboardWithSelection2Widget, ({ widget }) => 
  { 
    const [dashboardId, setDashboardId] = useState(null)
    const result = (
      <WidgetTag>
        <QuicksightDashboardSelection
          initialDashboardId={dashboardId}
          onSelectionChanged={setDashboardId}
        />
        {dashboardId && (
        <QuicksightDashboardEmbed dashboardId={dashboardId} />
      )}

      </WidgetTag>)
      return result
  }
)

const QuicksightDashboardSelection = connect(
  function QuicksightDashboardSelection({
    initialDashboardId,
    onSelectionChanged
  }: {
    initialDashboardId: string | null
    onSelectionChanged: any
  }) {
    const [dashboards, setDashboards] = useState<
      QuicksightDashboard[] | null
    >(null)
    const [error, setError] = useState<unknown>(null)
    const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(null)

    function onSelectedDashboardIdChanged(id: string | null) {
      setSelectedDashboardId(id)
      onSelectionChanged(id)
    }

    useEffect(() => {
      let cancelled = false

      fetchQuicksightDashboards()
        .then((fetchedDashboards) => {
          if (cancelled) return
          setDashboards(fetchedDashboards)
          onSelectedDashboardIdChanged(
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
          value={initialDashboardId ?? ''}
          onChange={(e) => onSelectedDashboardIdChanged(e.target.value)}
        >
          {dashboards.map((dashboard) => (
            <option value={dashboard.id} key={dashboard.id}>
              {dashboard.name}
            </option>
          ))}
        </select>
      </>
    )
  },
  { loading: Loading },
)
