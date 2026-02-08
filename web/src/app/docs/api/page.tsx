import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'API Documentation | CookiePass Developer Reference',
  description: 'Complete REST API documentation for CookiePass. Learn how to integrate secure session sharing into your applications.',
}

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-6">
              API v1
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              CookiePass
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> API </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete REST API reference for integrating secure session sharing into your applications.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-lg max-w-none">
            {/* Overview */}
            <div className="mb-12">
              <h2 id="overview" className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-600 mb-6">
                The CookiePass API provides programmatic access to session sharing functionality. 
                All API requests require authentication and use JSON for request and response bodies.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Base URL</h3>
                <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-mono">
                  https://api.cookiepass.app/v1
                </code>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-yellow-900 mb-2">Authentication</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  All API requests require a Bearer token in the Authorization header:
                </p>
                <code className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-mono block">
                  Authorization: Bearer YOUR_API_TOKEN
                </code>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Rate Limiting</h3>
                <p className="text-gray-700 text-sm mb-2">
                  API requests are limited to prevent abuse:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Free tier:</strong> 100 requests per hour</li>
                  <li><strong>Pro tier:</strong> 1,000 requests per hour</li>
                  <li><strong>Enterprise:</strong> 10,000 requests per hour</li>
                </ul>
              </div>
            </div>

            {/* Auth Endpoints */}
            <div className="mb-12">
              <h2 id="auth" className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Register User</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">POST /auth/register</code>
                  </div>
                  <p className="text-gray-600 mb-4">Create a new user account.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-4">
{`{
  "email": "user@example.com",
  "password": "secure_password"
}`}</pre>

                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "subscription_tier": "free",
      "created_at": "2026-02-08T12:00:00Z"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Login</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">POST /auth/login</code>
                  </div>
                  <p className="text-gray-600 mb-4">Authenticate and get an access token.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-4">
{`{
  "email": "user@example.com",
  "password": "secure_password"
}`}</pre>

                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "subscription_tier": "free"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get User Info</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /auth/me</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get information about the authenticated user.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "subscription_tier": "free",
    "monthly_share_limit": 50,
    "shares_this_month": 12,
    "created_at": "2026-02-08T12:00:00Z"
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Logout</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">POST /auth/logout</code>
                  </div>
                  <p className="text-gray-600 mb-4">Invalidate the current access token.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Share Endpoints */}
            <div className="mb-12">
              <h2 id="shares" className="text-3xl font-bold text-gray-900 mb-6">Shares</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">List Shares</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /shares</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get a paginated list of your shares.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Query Parameters</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li><code>status</code> - Filter by status (active, expired, revoked)</li>
                      <li><code>limit</code> - Number of results per page (default: 20, max: 100)</li>
                      <li><code>offset</code> - Number of results to skip for pagination</li>
                    </ul>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "items": [
      {
        "id": "share_abc123",
        "user_id": "user_123",
        "domain": "example.com",
        "is_revoked": false,
        "expires_at": "2026-02-09T12:00:00Z",
        "created_at": "2026-02-08T12:00:00Z",
        "max_uses": 10,
        "used_count": 3,
        "cookie_count": 5
      }
    ],
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Share</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /shares/:id</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get details of a specific share.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "share_abc123",
    "user_id": "user_123",
    "domain": "example.com",
    "is_revoked": false,
    "expires_at": "2026-02-09T12:00:00Z",
    "created_at": "2026-02-08T12:00:00Z",
    "revoked_at": null,
    "max_uses": 10,
    "used_count": 3,
    "cookie_count": 5
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Revoke Share</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">DELETE /shares/:id</code>
                  </div>
                  <p className="text-gray-600 mb-4">Revoke access to a share immediately.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "share_abc123",
    "is_revoked": true,
    "revoked_at": "2026-02-08T14:30:00Z"
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Import Endpoints */}
            <div className="mb-12">
              <h2 id="imports" className="text-3xl font-bold text-gray-900 mb-6">Imports</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Import Share</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">POST /shares/:id/import</code>
                  </div>
                  <p className="text-gray-600 mb-4">Import a shared session (this endpoint is typically used by the extension).</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "import_xyz789",
    "imported_at": "2026-02-08T14:30:00Z",
    "success": true
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Import History</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /shares/:id/imports</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get the import history for a specific share.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "items": [
      {
        "id": "import_xyz789",
        "share_id": "share_abc123",
        "imported_at": "2026-02-08T14:30:00Z",
        "success": true,
        "user_agent": "Mozilla/5.0...",
        "ip_hash": "a1b2c3d4..."
      }
    ],
    "total": 3
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Subscription Endpoints */}
            <div className="mb-12">
              <h2 id="subscription" className="text-3xl font-bold text-gray-900 mb-6">Subscription</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Subscription</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /subscription</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get current subscription information.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "tier": "free",
    "monthly_share_limit": 50,
    "shares_this_month": 12,
    "expires_at": null,
    "features": [
      "basic_sharing",
      "expiration_control",
      "usage_limits"
    ]
  }
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Create Checkout Session</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">POST /subscription/checkout</code>
                  </div>
                  <p className="text-gray-600 mb-4">Create a Stripe checkout session for upgrading to Pro.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-4">
{`{
  "tier": "pro",
  "billing_cycle": "monthly"
}`}</pre>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "checkout_url": "https://checkout.stripe.com/pay/cs_...",
    "session_id": "cs_test_123..."
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Guide Endpoints */}
            <div className="mb-12">
              <h2 id="guides" className="text-3xl font-bold text-gray-900 mb-6">Guides</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">List Guides</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /guides</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get all available session revocation guides.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "slug": "gmail-logout",
      "title": "How to Revoke Gmail Sessions",
      "description": "Step-by-step guide to logout from all Gmail devices",
      "difficulty": "easy",
      "service": "Gmail",
      "updated_at": "2026-02-01T12:00:00Z"
    },
    {
      "slug": "aws-console-sessions",
      "title": "AWS Console Session Management",
      "description": "Managing AWS Console sessions and access keys",
      "difficulty": "intermediate",
      "service": "AWS",
      "updated_at": "2026-02-01T12:00:00Z"
    }
  ]
}`}</pre>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Guide</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <code className="text-sm font-mono">GET /guides/:slug</code>
                  </div>
                  <p className="text-gray-600 mb-4">Get the full content of a specific guide.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "slug": "gmail-logout",
    "title": "How to Revoke Gmail Sessions",
    "description": "Step-by-step guide to logout from all Gmail devices",
    "difficulty": "easy",
    "service": "Gmail",
    "content": "# How to Revoke Gmail Sessions\\n\\n...",
    "steps": [
      {
        "title": "Open Gmail Settings",
        "description": "Click the gear icon in Gmail",
        "image_url": "https://..."
      }
    ],
    "updated_at": "2026-02-01T12:00:00Z"
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div className="mb-12">
              <h2 id="errors" className="text-3xl font-bold text-gray-900 mb-6">Error Handling</h2>
              <p className="text-gray-600 mb-6">
                The API uses conventional HTTP response codes to indicate success or failure. 
                Error responses include a detailed error message.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Response Format</h3>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "success": false,
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}`}</pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">HTTP Status Codes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><code className="text-gray-800">200</code> - Success</li>
                      <li><code className="text-gray-800">400</code> - Bad Request (invalid parameters)</li>
                      <li><code className="text-gray-800">401</code> - Unauthorized (invalid or missing token)</li>
                      <li><code className="text-gray-800">403</code> - Forbidden (insufficient permissions)</li>
                      <li><code className="text-gray-800">404</code> - Not Found</li>
                      <li><code className="text-gray-800">429</code> - Rate Limited</li>
                      <li><code className="text-gray-800">500</code> - Internal Server Error</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="mb-12">
              <h2 id="examples" className="text-3xl font-bold text-gray-900 mb-6">Code Examples</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">cURL Examples</h3>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Login and get token</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-6">
{`curl -X POST https://api.cookiepass.app/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "secure_password"
  }'`}</pre>

                  <h4 className="font-medium text-gray-900 mb-2">List shares</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-6">
{`curl -X GET https://api.cookiepass.app/v1/shares \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}</pre>

                  <h4 className="font-medium text-gray-900 mb-2">Revoke a share</h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`curl -X DELETE https://api.cookiepass.app/v1/shares/share_abc123 \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}</pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">JavaScript Example</h3>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`const API_BASE = 'https://api.cookiepass.app/v1';
const token = 'YOUR_API_TOKEN';

// Get user information
async function getUser() {
  const response = await fetch(\`\${API_BASE}/auth/me\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data);
}

// List all shares
async function listShares() {
  const response = await fetch(\`\${API_BASE}/shares?status=active\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data.data.items);
}`}</pre>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-center text-gray-500 mb-4">
                Need help with the API? Check out our guides or get in touch.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/docs" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Documentation →
                </Link>
                <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}