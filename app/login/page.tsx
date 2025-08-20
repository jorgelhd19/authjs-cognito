import { signIn, auth } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Bienvenido</CardTitle>
          <CardDescription>Inicia sesión con tu cuenta de Cognito para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server"
              await signIn("cognito", { redirectTo: "/dashboard" })
            }}
          >
            <Button type="submit" className="w-full" size="lg">
              Iniciar Sesión con Cognito
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
