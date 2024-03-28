import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function SellerId() {
  const locale = await getLocale()
  redirect(`/${locale}`)
  return null
}
