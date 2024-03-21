import { redirect } from 'next/navigation'
import { LOCALE } from '~/constant'

export default async function Page() {
  redirect(`/${LOCALE[1]}`)
}
