import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadConfirmation(
  to: string,
  name: string,
  serviceInterest: string
): Promise<void> {
  // Implemented in Phase 6
  void { resend, to, name, serviceInterest }
}
