import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold text-primary">¡Bienvenido!</CardTitle>
            <CardDescription className="text-lg">Has iniciado sesión exitosamente con Cognito</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground">Información del usuario:</p>
              <p>
                <strong>Nombre:</strong> {user?.name || "No disponible"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "No disponible"}
              </p>
            </div>

            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
              }}
              className="pt-4"
            >
              <Button type="submit" variant="outline" className="w-full bg-transparent">
                Cerrar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
