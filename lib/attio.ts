const ATTIO_BASE = 'https://api.attio.com/v2'

export async function upsertAttioContact(
  email: string,
  source: string
): Promise<void> {
  const key = process.env.ATTIO_API_KEY
  if (!key) return

  const headers = {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  }

  const personRes = await fetch(`${ATTIO_BASE}/objects/people/records`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      data: {
        values: {
          email_addresses: [{ email_address: email }],
        },
      },
      matching_attribute: 'email_addresses',
    }),
  })

  if (!personRes.ok) {
    throw new Error(`Attio upsert failed: ${personRes.status}`)
  }

  const person = await personRes.json()
  const recordId = person.data?.id?.record_id
  if (!recordId) return

  await fetch(`${ATTIO_BASE}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        parent_object: 'people',
        parent_record_id: recordId,
        title: `Lead source: ${source}`,
        content: `Submitted ${source} gate. Email: ${email}`,
      },
    }),
  })
}
