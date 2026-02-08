'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/lib/api'
import type { Share } from '@/types'

interface ActivityItem {
  id: string
  type: 'created' | 'imported' | 'revoked' | 'expired'
  timestamp: string
  share: {
    id: string
    domain: string
  }
  metadata?: {
    userAgent?: string
    ipHash?: string
  }
}

const ITEMS_PER_PAGE = 20

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'created' | 'imported' | 'revoked'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchActivities()
  }, [filter, currentPage])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      
      // Fetch shares to construct activity timeline
      const sharesResponse = await api.shares.list({ 
        page: currentPage,
        limit: ITEMS_PER_PAGE 
      })
      
      if (sharesResponse.success && sharesResponse.data) {
        const { shares, total } = sharesResponse.data
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
        
        // Convert shares to activity items
        const activityItems: ActivityItem[] = []
        
        for (const share of shares) {
          // Add creation activity
          activityItems.push({
            id: `created-${share.id}`,
            type: 'created',
            timestamp: share.createdAt,
            share: {
              id: share.id,
              domain: share.domain
            }
          })
          
          // Add revocation activity if revoked
          if (share.isRevoked && share.revokedAt) {
            activityItems.push({
              id: `revoked-${share.id}`,
              type: 'revoked',
              timestamp: share.revokedAt,
              share: {
                id: share.id,
                domain: share.domain
              }
            })
          }
          
          // Add expiration activity if expired
          if (share.status === 'expired') {
            activityItems.push({
              id: `expired-${share.id}`,
              type: 'expired',
              timestamp: share.expiresAt,
              share: {
                id: share.id,
                domain: share.domain
              }
            })
          }

          // Fetch imports for this share
          try {
            const importsResponse = await api.shares.getImports(share.id)
            if (importsResponse.success && importsResponse.data) {
              for (const importRecord of importsResponse.data.imports) {
                activityItems.push({
                  id: `imported-${importRecord.id}`,
                  type: 'imported',
                  timestamp: importRecord.importedAt,
                  share: {
                    id: share.id,
                    domain: share.domain
                  },
                  metadata: {
                    userAgent: importRecord.userAgent,
                    ipHash: importRecord.ipHash
                  }
                })
              }
            }
          } catch (err) {
            // Ignore import fetch errors
          }
        }
        
        // Sort by timestamp (most recent first) and filter
        const sortedActivities = activityItems
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .filter(item => filter === 'all' || item.type === filter)
        
        setActivities(sortedActivities)
      } else {
        setError('Failed to load activity')
      }
    } catch (err) {
      setError('Failed to load activity')
      console.error('Error fetching activities:', err)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        )
      case 'imported':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
        )
      case 'revoked':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      case 'expired':
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
    }
  }

  const getActivityMessage = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'created':
        return `Created a share for ${activity.share.domain}`
      case 'imported':
        return `Someone imported your share for ${activity.share.domain}`
      case 'revoked':
        return `Revoked share access for ${activity.share.domain}`
      case 'expired':
        return `Share for ${activity.share.domain} has expired`
    }
  }

  const getActivityBadge = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return <Badge className="bg-blue-100 text-blue-800">Created</Badge>
      case 'imported':
        return <Badge className="bg-green-100 text-green-800">Imported</Badge>
      case 'revoked':
        return <Badge className="bg-red-100 text-red-800">Revoked</Badge>
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  const formatUserAgent = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Unknown Browser'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
          <p className="text-gray-600">Track all activity related to your session shares</p>
        </div>
        
        <Button onClick={() => window.location.reload()}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          {(['all', 'created', 'imported', 'revoked'] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "primary" : "ghost"}
              size="sm"
              onClick={() => {
                setFilter(filterOption)
                setCurrentPage(1)
              }}
            >
              {filterOption === 'all' ? 'All Activity' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="p-6">
        {loading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load activity</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchActivities}>
              Try again
            </Button>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "Activity will appear here as you create and share sessions."
                : `No ${filter} activity found. Try a different filter.`}
            </p>
            {filter !== 'all' && (
              <Button onClick={() => setFilter('all')}>
                Show all activity
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-gray-900 font-medium">
                        {getActivityMessage(activity)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getActivityBadge(activity.type)}
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {activity.metadata && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
                      <div className="flex items-center gap-4">
                        {activity.metadata.userAgent && (
                          <span>Browser: {formatUserAgent(activity.metadata.userAgent)}</span>
                        )}
                        {activity.metadata.ipHash && (
                          <span>IP: {activity.metadata.ipHash.substring(0, 8)}...</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}