import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Cognito({
        authorization: {
            params: { 
              scope: "openid email phone aws.cognito.signin.user.admin",
            },
          },
    })],
})