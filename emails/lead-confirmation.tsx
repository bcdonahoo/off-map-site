import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface LeadConfirmationProps {
  name: string
  serviceInterest?: string
}

const serviceLabel: Record<string, string> = {
  'gtm-stack': 'GTM Stack Build',
  'managed-retainer': 'Managed GTM Retainer',
  'not-sure': 'Not sure yet',
}

export default function LeadConfirmation({
  name = 'there',
  serviceInterest,
}: LeadConfirmationProps) {
  const label = serviceInterest ? (serviceLabel[serviceInterest] ?? serviceInterest) : null

  return (
    <Html>
      <Head />
      <Preview>We got your request — expect a reply within one business day.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>OFF-MAP</Text>

          <Heading style={h1}>We got it, {name}.</Heading>

          <Text style={body}>
            Thanks for reaching out. Someone from Off-Map will follow up within
            one business day to schedule a 30-minute scope call.
          </Text>

          {label && (
            <Section style={highlight}>
              <Text style={highlightText}>
                You flagged interest in: <strong>{label}</strong>
              </Text>
            </Section>
          )}

          <Text style={body}>
            In the meantime, you can read more about how we work on the{' '}
            <Link href="https://off-map.com/stack" style={link}>
              stack page
            </Link>{' '}
            or browse the{' '}
            <Link href="https://off-map.com/blog" style={link}>
              blog
            </Link>
            .
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Off-Map · GTM Engineering ·{' '}
            <Link href="mailto:hello@off-map.com" style={link}>
              hello@off-map.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  fontFamily:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '48px 24px',
  maxWidth: '560px',
}

const eyebrow: React.CSSProperties = {
  color: '#00C2A8',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontFamily: 'monospace',
  marginBottom: '24px',
}

const h1: React.CSSProperties = {
  color: '#F5F5F3',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '1.3',
  marginBottom: '16px',
}

const body: React.CSSProperties = {
  color: '#A3A3A3',
  fontSize: '15px',
  lineHeight: '1.7',
  marginBottom: '16px',
}

const highlight: React.CSSProperties = {
  backgroundColor: '#141414',
  border: '1px solid #2A2A2A',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '16px',
}

const highlightText: React.CSSProperties = {
  color: '#A3A3A3',
  fontSize: '14px',
  margin: 0,
}

const hr: React.CSSProperties = {
  borderColor: '#2A2A2A',
  margin: '32px 0',
}

const footer: React.CSSProperties = {
  color: '#525252',
  fontSize: '12px',
}

const link: React.CSSProperties = {
  color: '#00C2A8',
  textDecoration: 'underline',
}
