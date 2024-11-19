"use client";

// next
import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProviders, getCsrfToken, useSession } from "next-auth/react";

// material-ui
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import AuthWrapper from "@/sections/auth/AuthWrapper";
import AuthLogin from "@/sections/auth/auth-forms/AuthLogin";


import {ImSpinner8} from "react-icons/im"

export default function SignIn() {
  const { data: session, status } = useSession();
  const csrfToken = getCsrfToken();
  const providers = getProviders();
  const router = useRouter()

  useEffect(()=>{
    if(status === "authenticated"){
      return router.push("/corporate")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <ImSpinner8 className="animate-spin text-3xl text-black" />
      </div>
    );
  }
  if(status === "unauthenticated"){
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Login</Typography>
            <NextLink
              href={session ? "/pages/register" : "/auth/register"}
              passHref
              legacyBehavior
            >
              <Link variant="body1" color="primary">
                Don&apos;t have an account?
              </Link>
            </NextLink>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin providers={providers} csrfToken={csrfToken} />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
}


