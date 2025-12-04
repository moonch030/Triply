import SocialLogin from '@/components/layout/login/SocialLogin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SocialLogin />

}
