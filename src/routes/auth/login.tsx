import SocialLoginContainer from '@/components/layout/login/SocialLoginContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SocialLoginContainer />

}
