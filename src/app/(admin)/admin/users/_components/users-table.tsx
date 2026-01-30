'use client'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'

export default function UsersTable({ users, search }: any) {
  const [globalFilter, setGlobalFilter] = useState(search)

  const onSearch = (value: string) => {
    setGlobalFilter(value)
    const params = new URLSearchParams(window.location.search)
    if (value) params.set('search', value)
    else params.delete('search')
    window.location.search = params.toString()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(globalFilter)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
          />
        </div>
        <button
          onClick={() => onSearch(globalFilter)}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user: any, index: number) => (
          <div
            key={user.id || index}
            className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:bg-gray-50 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* User Info */}
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.full_name}&background=random`}
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                  alt="avatar"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{user.full_name}</span>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Role Badge & Actions */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase ${
                    user.role === 'admin' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {user.role}
                </span>

                {/* Action Button */}
                <button
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-colors"
                  title="Reset password to default"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-3">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">No users found</h3>
            <p className="text-gray-500 text-sm">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  )
}
