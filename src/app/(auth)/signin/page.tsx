"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ArrowRight,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  LucideShieldCheck,
  Mail,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { GoogleIcon } from "hugeicons-react"

// Form validation schema
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(data: SignInFormValues) {
    setIsLoading(true)

    // Here you would typically send the data to your backend API
    console.log(data)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <LucideShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Supa Events</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Don't have an account?</span>
            <Button variant="outline" asChild>
              <Link href="/signup">
                Sign up <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-4xl grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 hidden md:flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue where you left off.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Seamless Experience</h3>
                  <p className="text-sm text-muted-foreground">Pick up right where you left off</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Our team is always ready to help</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-2xl md:hidden">Welcome back</CardTitle>
              <CardDescription className="md:hidden">Sign in to your account</CardDescription>
              <CardTitle className="hidden md:block">Sign in to your account</CardTitle>
              <CardDescription className="hidden md:block">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="john.doe@example.com" type="email" className="pl-9" {...field} />
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className="pl-9 pr-10"
                                {...field}
                              />
                              <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} id="rememberMe" />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal" htmlFor="rememberMe">
                                Remember me
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <Button className="w-full" type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col">
              <div className="relative w-full my-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 w-full">
                <Button variant="outline" className="w-full" onClick={() => console.log("Sign in with Google")}>
                  {/* <Image
                    src="/placeholder.svg?height=16&width=16"
                    alt="Google"
                    width={16}
                    height={16}
                    className="mr-2"
                  /> */}
                  <GoogleIcon size={20}/>
                  Google
                </Button>
                {/* <Button variant="outline" className="w-full" onClick={() => console.log("Sign in with Facebook")}>
                  <Image
                    src="/placeholder.svg?height=16&width=16"
                    alt="Facebook"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Facebook
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Supa Events. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

