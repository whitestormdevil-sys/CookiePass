'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { BlogPost } from '@/types'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

const blogPosts: Record<string, BlogPost & { content: string }> = {
  'why-sharing-passwords-is-dangerous': {
    slug: 'why-sharing-passwords-is-dangerous',
    title: 'Why Sharing Passwords is Dangerous (And What to Do Instead)',
    excerpt: 'Password sharing is one of the biggest security risks in modern organizations. Learn why it\'s dangerous and discover secure alternatives.',
    author: 'CookiePass Team',
    publishedAt: '2026-02-08T10:00:00Z',
    readTime: 5,
    tags: ['Security', 'Best Practices', 'Team Collaboration'],
    content: `
# Why Sharing Passwords is Dangerous (And What to Do Instead)

Password sharing has become ubiquitous in modern workplaces. From shared social media accounts to emergency access scenarios, teams constantly find themselves needing to share credentials. However, traditional password sharing methods pose significant security risks that many organizations underestimate.

## The Hidden Dangers of Password Sharing

### 1. No Audit Trail

When you share a password through Slack, email, or a sticky note, you lose all visibility into who accessed what and when. This makes it nearly impossible to:
- Track unauthorized access
- Investigate security incidents
- Meet compliance requirements
- Understand usage patterns

### 2. Password Exposure in Transit

Traditional sharing methods expose credentials during transmission:
- **Email**: Passwords sit in inboxes indefinitely
- **Chat apps**: Messages are stored and searchable
- **Documents**: Credentials persist in shared files
- **Voice calls**: No guarantee of secure channels

### 3. Lack of Access Control

Once shared, passwords are out of your control:
- Can't revoke access for specific individuals
- No expiration dates or usage limits
- Former employees may retain access
- Can't track who has the credentials

### 4. Password Reuse and Weak Security

Shared passwords often become:
- Weaker to accommodate multiple users
- Unchanged for long periods
- Reused across multiple services
- Stored insecurely by recipients

## Real-World Consequences

### Case Study: The Marketing Agency Breach

A mid-sized marketing agency shared their client's social media passwords through email. When an employee's email was compromised:
- Attacker gained access to 15+ client accounts
- $50,000 in fraudulent advertising spend
- Multiple clients terminated contracts
- 6 months of reputation recovery

### The Numbers Don't Lie

According to recent security reports:
- **81%** of data breaches involve compromised passwords
- **59%** of people reuse passwords across multiple accounts
- **43%** of cyber attacks target small businesses
- **$4.45M** average cost of a data breach in 2023

## Secure Alternatives to Password Sharing

### 1. Session Sharing (Recommended)

Instead of sharing passwords, share authenticated sessions:
- **How it works**: Export your logged-in state and share it securely
- **Benefits**: No password exposure, controlled access, audit trails
- **Tools**: CookiePass, similar session-sharing solutions

### 2. Single Sign-On (SSO)

Implement SSO for team access:
- Centralized authentication
- Individual user accounts
- Granular permission control
- Complete audit logs

### 3. Password Managers with Sharing

Use business password managers:
- Encrypted password vaults
- Controlled sharing features
- Access revocation capabilities
- Usage monitoring

### 4. Role-Based Access

Design systems with proper access controls:
- Service accounts for automation
- Role-based permissions
- Temporary access grants
- Regular access reviews

## Best Practices for Secure Access

### For Teams Using CookiePass

1. **Set Appropriate Expiration**: Don't make sessions last longer than necessary
2. **Use Usage Limits**: Limit the number of times a session can be imported
3. **Monitor Access**: Regularly review who's accessing your shares
4. **Revoke When Needed**: Immediately revoke access when team members leave

### For General Security Hygiene

1. **Regular Password Updates**: Change passwords periodically
2. **Unique Passwords**: Never reuse passwords across services  
3. **Two-Factor Authentication**: Enable 2FA wherever possible
4. **Security Training**: Educate team members on secure practices

## Making the Transition

### Step 1: Audit Current Practices

- Identify where password sharing occurs
- Document shared accounts and services
- Assess security risks and compliance needs

### Step 2: Choose Appropriate Solutions

- Session sharing for temporary access
- SSO for permanent team access
- Password managers for credential storage
- Role-based access for new systems

### Step 3: Implement Gradually

- Start with highest-risk accounts
- Train team members on new tools
- Phase out insecure sharing methods
- Monitor and adjust policies

## The Bottom Line

Password sharing isn't inherently evil—it's often necessary for business operations. The key is doing it securely. Traditional methods like email, chat, and documents expose your organization to unnecessary risks.

Modern solutions like session sharing offer a secure middle ground: they provide the access your team needs while maintaining security controls, audit trails, and the ability to revoke access when necessary.

**Remember**: The goal isn't to eliminate access sharing—it's to make it secure, controlled, and auditable.

## Get Started with Secure Sharing

Ready to move beyond insecure password sharing? [Download CookiePass](/download) and start sharing sessions securely today. Your security team (and your clients) will thank you.
`
  },
  'cookiepass-encryption-deep-dive': {
    slug: 'cookiepass-encryption-deep-dive',
    title: 'How CookiePass Uses End-to-End Encryption to Protect Your Sessions',
    excerpt: 'A technical deep-dive into CookiePass\'s encryption architecture and why zero-knowledge matters.',
    author: 'CookiePass Team', 
    publishedAt: '2026-02-07T14:30:00Z',
    readTime: 8,
    tags: ['Security', 'Technical', 'Encryption'],
    content: `
# How CookiePass Uses End-to-End Encryption to Protect Your Sessions

When you share a browser session through CookiePass, your data goes through multiple layers of encryption to ensure maximum security. This article provides a technical deep-dive into our encryption architecture and explains why zero-knowledge matters for session security.

## The Challenge of Secure Session Sharing

Browser sessions contain sensitive information:
- Authentication cookies
- Session tokens
- User preferences
- Temporary data

This information is valuable to attackers and needs protection both in transit and at rest. Traditional cloud storage isn't sufficient—we need end-to-end encryption where only you control the keys.

## CookiePass Encryption Architecture

### Client-Side Encryption (AES-256-GCM)

All encryption happens in your browser before data leaves your device:

\`\`\`javascript
// Simplified encryption flow
const sessionData = extractCookies(domain)
const encryptionKey = generateSecureKey()
const encrypted = aes256gcm.encrypt(sessionData, encryptionKey)
const shareUrl = createShare(encrypted, metadata)
\`\`\`

**Key Features:**
- **AES-256-GCM**: Industry-standard authenticated encryption
- **Unique keys**: Each share gets a fresh encryption key
- **Authentication**: Prevents tampering during transmission
- **No server-side decryption**: We never see your plain data

### Key Derivation and Management

CookiePass uses a hybrid approach for key management:

1. **Master key generation**: Created client-side using Web Crypto API
2. **Key derivation**: PBKDF2 with 100,000 iterations
3. **Key splitting**: Share key embedded in URL fragment
4. **Server isolation**: Servers never receive the decryption key

\`\`\`javascript
// Key derivation process
const masterKey = crypto.getRandomValues(new Uint8Array(32))
const salt = crypto.getRandomValues(new Uint8Array(16))
const derivedKey = await crypto.subtle.deriveKey({
  name: 'PBKDF2',
  salt: salt,
  iterations: 100000,
  hash: 'SHA-256'
}, masterKey, { name: 'AES-GCM', length: 256 })
\`\`\`

### Zero-Knowledge Architecture

CookiePass implements true zero-knowledge encryption:

**What we store:**
- Encrypted session data (unreadable to us)
- Metadata (domain, expiration, usage count)
- Access logs (anonymized)

**What we never see:**
- Your cookies or session tokens
- The decryption keys
- The original domain content
- Your browsing data

## Encryption in Practice

### Creating a Share

1. **Data Collection**: Extract relevant cookies for the domain
2. **Key Generation**: Create unique AES-256 key client-side
3. **Encryption**: Encrypt cookies using AES-GCM mode
4. **Upload**: Send encrypted blob to our servers
5. **URL Creation**: Embed decryption key in URL fragment

### Importing a Share

1. **URL Parsing**: Extract encrypted blob ID and key from URL
2. **Download**: Retrieve encrypted data from servers
3. **Decryption**: Decrypt data client-side using URL key
4. **Installation**: Apply cookies to browser session
5. **Cleanup**: Remove decryption key from memory

## Security Features

### Authenticated Encryption (AES-GCM)

GCM mode provides both confidentiality and authenticity:
- **Confidentiality**: Data is encrypted and unreadable
- **Authenticity**: Tampering is detected and rejected
- **Performance**: Hardware acceleration available
- **Nonce handling**: Automatic IV generation and verification

### Forward Secrecy

Each share uses unique cryptographic material:
- Keys are never reused between shares
- Compromising one share doesn't affect others
- Keys are generated using cryptographically secure RNG
- Old keys are securely erased after use

### Transport Security

All communication uses modern TLS:
- **TLS 1.3**: Latest transport layer security
- **Certificate pinning**: Prevents man-in-the-middle attacks  
- **HSTS headers**: Forces encrypted connections
- **Perfect forward secrecy**: Each connection uses unique keys

## Threat Model and Defenses

### Against Data Breaches

Even if our servers are compromised:
- **Encrypted at rest**: All session data is encrypted
- **No plaintext**: We never store unencrypted sessions
- **Key separation**: Decryption keys aren't on our servers
- **Minimal metadata**: Limited information exposure

### Against Network Attacks

Protection during data transmission:
- **TLS encryption**: All traffic is encrypted in transit
- **Certificate validation**: Prevents certificate spoofing
- **MITM protection**: Public key pinning and validation
- **Request signing**: API requests are cryptographically signed

### Against Malicious Insiders

Zero-knowledge means even we can't access your data:
- **No plaintext access**: Employees can't decrypt session data
- **Audit logs**: All access to encrypted data is logged
- **Principle of least privilege**: Limited system access
- **Regular security training**: Employee security awareness

## Implementation Details

### Browser Compatibility

CookiePass uses standard Web APIs available in modern browsers:

\`\`\`javascript
// Feature detection
if (!window.crypto?.subtle) {
  throw new Error('Web Crypto API not available')
}

if (!window.TextEncoder) {
  throw new Error('TextEncoder not available')  
}
\`\`\`

**Supported browsers:**
- Chrome 60+ (recommended)
- Firefox 78+
- Safari 14+
- Edge 79+

### Performance Considerations

Encryption is optimized for speed:
- **Hardware acceleration**: Uses AES-NI when available
- **Minimal overhead**: <50ms encryption time for typical sessions
- **Streaming**: Large sessions processed in chunks
- **Background processing**: Web Workers for CPU-intensive operations

### Memory Safety

Secure handling of cryptographic material:
- **Secure cleanup**: Keys overwritten after use
- **Limited lifetime**: Keys exist only during operations
- **No disk storage**: Keys never written to disk
- **Memory protection**: Using typed arrays for key material

## Compliance and Standards

CookiePass follows industry best practices:

- **NIST recommendations**: AES-256-GCM encryption
- **OWASP guidelines**: Secure key management
- **SOC 2 Type II**: Third-party security audit
- **GDPR compliance**: Data protection by design

## Open Source Verification

The CookiePass browser extension is open source:
- **GPL v3 license**: Freedom to inspect and audit
- **GitHub repository**: Complete source code available
- **Reproducible builds**: Verify extension matches source code
- **Community security reviews**: External security researchers welcome

## Conclusion

CookiePass's encryption architecture ensures that your session data remains private and secure throughout the sharing process. By implementing zero-knowledge encryption with industry-standard algorithms, we provide the security guarantees that modern teams need.

Key takeaways:
- **True zero-knowledge**: We never have access to your unencrypted data
- **Industry-standard crypto**: AES-256-GCM with proper key management
- **Defense in depth**: Multiple layers of security protection
- **Open source**: Transparency through open-source code

Ready to experience secure session sharing? [Download the CookiePass extension](/download) and see zero-knowledge encryption in action.
`
  },
  'secure-session-sharing-best-practices': {
    slug: 'secure-session-sharing-best-practices',
    title: '5 Best Practices for Secure Session Sharing in Teams',
    excerpt: 'Essential guidelines for safely sharing authenticated sessions across your team.',
    author: 'CookiePass Team',
    publishedAt: '2026-02-06T09:15:00Z', 
    readTime: 6,
    tags: ['Best Practices', 'Team Management', 'Security'],
    content: `
# 5 Best Practices for Secure Session Sharing in Teams

Session sharing has become essential for modern teams, but it comes with security risks that need to be managed carefully. Whether you're using CookiePass or another session-sharing solution, following these best practices will help protect your team and your data.

## 1. Implement Time-Based Access Controls

**Set appropriate expiration times for shared sessions**

The longer a shared session stays active, the greater the risk of unauthorized access. Different use cases require different expiration strategies:

### Short-term collaboration (1-4 hours)
- Quick troubleshooting sessions
- Temporary client access
- One-time demonstrations
- Emergency fixes

### Medium-term projects (1-7 days)  
- Ongoing development work
- Content creation projects
- Marketing campaigns
- Training sessions

### Long-term access (1-30 days)
- Permanent team member onboarding
- Seasonal contractors
- Extended consulting engagements

**CookiePass recommendation:** Default to 24 hours and only extend when necessary. You can always create a new share if the original expires.

## 2. Use Usage Limits and Monitoring

**Control how many times a session can be accessed**

Usage limits prevent session shares from being used more than intended:

\`\`\`
Single use: Demo sessions, one-time access
Limited use (2-10): Team collaboration, temporary access  
Unlimited: Long-term team members (with short expiration)
\`\`\`

### Monitoring is crucial
- Track who accesses your shares and when
- Set up alerts for unexpected usage patterns
- Regular audit of active shares
- Review access logs monthly

**Red flags to watch for:**
- Multiple imports from different locations
- Imports at unusual times
- Rapid consumption of usage limits
- Imports after team members have left

## 3. Apply the Principle of Least Privilege

**Only share access to what's actually needed**

Before creating a session share, ask yourself:
- Does this person need full access to this account?
- Can I accomplish this with a more limited approach?
- Is there a better way to provide the needed information?

### Domain-specific sharing
Instead of sharing your entire Google account, consider:
- Sharing just Gmail access
- Creating a Google Drive share for specific folders
- Using Google Workspace's built-in sharing features
- Providing read-only access when possible

### Alternative approaches
Sometimes session sharing isn't the best solution:
- **Screen sharing** for demonstrations
- **Temporary passwords** for one-time setup
- **Role-based access** for permanent needs
- **API keys** for automated systems

## 4. Maintain an Access Registry

**Keep track of who has access to what**

Documentation is crucial for security and compliance:

### What to track
- **Active shares**: Current session shares and their recipients
- **Access purposes**: Why access was granted
- **Expiration dates**: When shares expire
- **Usage patterns**: How shares are being used
- **Revocation events**: When and why access was removed

### Sample access registry

| Share ID | Service | Recipient | Purpose | Expires | Status |
|----------|---------|-----------|---------|---------|---------|
| abc123 | AWS Console | John Doe | Debug prod issue | 2026-02-09 | Active |
| def456 | Gmail | Jane Smith | Campaign setup | 2026-02-15 | Active |
| ghi789 | Shopify | Ex-employee | Order processing | 2026-02-01 | Revoked |

### Automation opportunities
- Calendar reminders for expiring shares
- Automated revocation based on HR systems
- Slack notifications for new shares
- Monthly access review reports

## 5. Plan for Incident Response

**Know what to do when things go wrong**

Even with perfect practices, security incidents can happen. Having a response plan minimizes damage:

### Immediate response (0-1 hour)
1. **Revoke access** immediately in CookiePass
2. **Change passwords** on affected accounts
3. **Review logs** to understand the scope
4. **Notify stakeholders** about the incident

### Short-term response (1-24 hours)
1. **Audit all active shares** and revoke unnecessary ones
2. **Review account activity** on affected services
3. **Document the incident** and timeline
4. **Implement additional monitoring** if needed

### Long-term response (1-7 days)
1. **Conduct post-mortem** to understand root cause
2. **Update security practices** based on lessons learned
3. **Additional training** for team members
4. **Review and update incident response plan**

## Implementation Checklist

### For Team Leaders
- [ ] Establish session sharing policies
- [ ] Train team members on secure practices
- [ ] Set up monitoring and alerting
- [ ] Regular access reviews (monthly)
- [ ] Incident response plan in place

### For Individual Contributors  
- [ ] Use shortest appropriate expiration times
- [ ] Set usage limits based on actual need
- [ ] Monitor your active shares regularly
- [ ] Revoke access immediately when no longer needed
- [ ] Document who you've shared access with

### For Security Teams
- [ ] Audit session sharing tools and practices
- [ ] Integrate with identity management systems
- [ ] Set up automated compliance reporting
- [ ] Regular security training for session sharing
- [ ] Penetration testing of shared sessions

## Common Pitfalls to Avoid

### The "Set and Forget" Problem
Creating shares and never reviewing them leads to:
- Stale access for ex-employees
- Overly broad permissions
- Compliance violations
- Security incidents

**Solution:** Set calendar reminders to review access monthly.

### Over-sharing Access
Giving more access than needed because it's convenient:
- Full account access instead of specific services
- Long expiration times "just in case"
- High usage limits "to be safe"

**Solution:** Start restrictive and expand only when necessary.

### No Audit Trail
Not tracking who has access makes incident response difficult:
- Can't identify the source of unauthorized access  
- No compliance documentation
- Difficult to conduct access reviews

**Solution:** Document all shares in a central registry.

## Tools and Technologies

### CookiePass Features for Best Practices
- **Expiration controls**: Set custom expiration times
- **Usage limits**: Control how many times shares can be used
- **Access monitoring**: See who accesses your shares
- **Instant revocation**: Remove access immediately
- **Audit logs**: Complete history of share activity

### Complementary Security Tools
- **Password managers**: For secure credential storage
- **SSO solutions**: For centralized authentication
- **Monitoring tools**: For unusual activity detection
- **Identity management**: For automated access controls

## Measuring Success

Track these metrics to ensure your session sharing practices are secure:

### Security metrics
- Time to revoke access during incidents
- Number of stale/expired shares
- Compliance with expiration policies
- Frequency of access reviews

### Operational metrics
- Time saved through secure session sharing
- Reduction in password sharing incidents
- Team adoption of secure practices
- Customer/client satisfaction with access management

## Conclusion

Secure session sharing isn't just about choosing the right tool—it's about implementing the right processes and practices. By following these five best practices, your team can enjoy the benefits of session sharing while maintaining strong security posture.

**Remember:**
1. **Time limits** prevent long-term exposure
2. **Usage monitoring** catches unauthorized access early
3. **Least privilege** minimizes potential damage
4. **Documentation** enables compliance and incident response
5. **Incident planning** reduces response time when things go wrong

Ready to implement secure session sharing for your team? [Get started with CookiePass](/download) and put these best practices into action.
`
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  
  const post = blogPosts[params.slug]
  
  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Get related posts (excluding current post)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/blog" className="hover:text-gray-900">Blog</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{post.tags[0]}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>•</span>
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>by {post.author}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {copySuccess ? (
                  <>
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Link copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy link
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br>').replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                }} 
              />
            </article>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.author}</h3>
                  <p className="text-gray-600 mb-4">
                    The CookiePass team consists of security engineers, developers, and privacy advocates 
                    committed to making session sharing safe and accessible for everyone.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                      More articles →
                    </Link>
                    <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                      Contact us →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <time dateTime={relatedPost.publishedAt}>
                        {formatDate(relatedPost.publishedAt)}
                      </time>
                      <span>•</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-indigo-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                    >
                      Read article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <PublicFooter />
    </div>
  )
}