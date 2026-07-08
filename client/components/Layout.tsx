import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-xl font-semibold">PMS — Client</div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">{children}</main>

      <footer className="border-t bg-white p-4 text-center text-sm">
        Built for the project-management-system repo
      </footer>
    </div>
  )
}
