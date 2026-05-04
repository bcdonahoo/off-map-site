import { Resend } from 'resend'
import { render } from '@react-email/components'
import LeadConfirmation from '@/emails/lead-confirmation'

export async function sendLeadConfirmation(
  to: string,
  name: string,
  serviceInterest?: string
): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const html = await render(
    LeadConfirmation({ name, serviceInterest })
  )

  await resend.emails.send({
    from: 'Off-Map <hello@off-map.com>',
    to,
    subject: 'We got your request — Off-Map',
    html,
  })
}
