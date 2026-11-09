import { useEffect, useRef, useState } from 'react'
import { connect } from 'scrivito'
import { DataErrorEditorNote } from './DataErrorEditorNote'
import { Loading } from './Loading'
import { fetchQuicksightEmbedUrl } from '../Data/Quicksight/fetchQuicksightEmbedUrl'
import { getQuicksightEmbeddingContext } from '../Data/Quicksight/quicksightEmbeddingContext'

export const QuicksightDashboardEmbed = connect(
  function QuicksightDashboardEmbed({
    dashboardId,
  }: {
    dashboardId: string
  }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [refreshToken, setRefreshToken] = useState(0)

    useEffect(() => {
      let cancelled = false
      let timeoutId: ReturnType<typeof setTimeout>
      setIsLoading(true)
      setError(null)

      fetchQuicksightEmbedUrl(dashboardId)
        .then(async ({ embedUrl, expiresAt }) => {
          if (cancelled || !containerRef.current) return

          const context = await getQuicksightEmbeddingContext()
          await context.embedDashboard({
            url: embedUrl,
            container: containerRef.current,
            height: '600px',
            resizeHeightOnSizeChangedEvent: true,
          })
          if (cancelled) return
          setIsLoading(false)

          const msUntilExpiry = new Date(expiresAt).getTime() - Date.now()
          timeoutId = setTimeout(
            () => setRefreshToken((token) => token + 1),
            Math.max(msUntilExpiry - 60_000, 0),
          )
        })
        .catch((e) => {
          if (!cancelled) {
            setIsLoading(false)
            setError(e)
          }
        })

      return () => {
        cancelled = true
        clearTimeout(timeoutId)
      }
    }, [dashboardId, refreshToken])

    if (error) return <DataErrorEditorNote error={error} />

    return (
      <>
        {isLoading && <Loading />}
        <div key={`${dashboardId}-${refreshToken}`} ref={containerRef} />
      </>
    )
  },
  { loading: Loading },
)
