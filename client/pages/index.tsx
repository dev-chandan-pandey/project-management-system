import { useEffect, useState } from 'react'
import api from '../utils/api'
import Layout from '../components/Layout'

type Project = {
  _id?: string
  name: string
  description?: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      setError(null)
      try {
        // Try common endpoints. The server in this repo may expose /projects or /api/projects.
        const endpoints = ['/projects', '/api/projects', '/project']
        let res = null
        for (const ep of endpoints) {
          try {
            res = await api.get(ep)
            if (res?.status === 200) break
          } catch (e) {
            // continue trying
          }
        }

        if (!res) {
          setError('No reachable projects endpoint found on the backend. Set NEXT_PUBLIC_API_URL to your server and ensure it exposes /projects or /api/projects')
          setProjects([])
        } else {
          setProjects(res.data)
        }
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Project Management — Frontend</h1>

        <p className="mb-4 text-sm text-muted-foreground">This simple Next.js UI connects to the backend. Set NEXT_PUBLIC_API_URL if your server runs on a non-default host.</p>

        <div className="mb-4">
          <div className="inline-flex items-center gap-2">
            <span className="font-medium">Backend:</span>
            <code className="text-sm">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</code>
          </div>
        </div>

        <div>
          {loading && <div>Loading projects…</div>}
          {error && <div className="text-red-600">{error}</div>}

          {!loading && projects && projects.length === 0 && (
            <div className="text-gray-600">No projects returned from backend.</div>
          )}

          {!loading && projects && projects.length > 0 && (
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p._id ?? p.name} className="p-4 border rounded">
                  <div className="font-semibold">{p.name}</div>
                  {p.description && <div className="text-sm text-gray-600">{p.description}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
}
