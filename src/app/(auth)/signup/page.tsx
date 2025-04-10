"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  LucideShieldCheck,
  Mail,
  Phone,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useMutation } from "@tanstack/react-query"
import { ApiError, AuthResponse, RegisterRequest } from "@/services/auth/type"
import { registerUser } from "@/services/auth/authenticationService"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Cookies from 'js-cookie';
import { signUpSchema } from "@/services/auth/validation"

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  console.log("Form errors:", form.formState.errors)

  function calculatePasswordStrength(password: string): number {
    if (!password) return 0

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 25
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25
    // Contains number
    if (/[0-9]/.test(password)) strength += 25
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    return strength
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value
    form.setValue("password", password)
    setPasswordStrength(calculatePasswordStrength(password))
  }

  const mutation = useMutation<AuthResponse, ApiError, RegisterRequest>({
    mutationFn: (userData: RegisterRequest) => registerUser(userData),
    onSuccess: (response) => {
      console.log("Account created successful:", response)
      toast({
        variant: "success",
        title: "Success",
        description: "Account created successful",
        duration: 5000,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      Cookies.set("supa.events.co.tz.access", response?.data?.accessToken)
      // router.push("/signin/otp");
      if(response.data.user.accountType === "customer"){
        router.push("/client/dashboard")
      }else if(response.data.user.accountType === "vendor"){
        router.push("/vendor/dashboard")
      }else{
        router.push("/signin");
      }
    },
    onError: (error) => {
      const errorData = error?.response?.data;
      console.error("Login failed:", errorData);

      if (errorData?.validationErrors?.length) {
        toast({
          variant: "destructive",
          title: "Validation error",
          description: errorData.validationErrors.join(", "),
          duration: 5000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      } else if (errorData?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error,
          duration: 5000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      } else if (errorData?.errorDescription) {
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.errorDescription,
          duration: 5000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });

      } else if (errorData?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.message,
          duration: 5000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred",
          duration: 5000,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
    },
  });

  function onSubmit(data: SignUpFormValues) {
    console.log("Form submitted:", data)
    const userData: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      accountType: data.accountType,
      customerType: data.accountType,
    }

    mutation.mutate(userData)
  
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
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <Button variant="outline" asChild>
              <Link href="/signin">
                Sign in <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-4xl grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 hidden md:flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Join our platform</h1>
              <p className="text-muted-foreground">
                Create an account to access all features and start managing your business efficiently.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Secure & Reliable</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade security for your data</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Our team is always ready to help</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Seamless Integration</h3>
                  <p className="text-sm text-muted-foreground">Works with your existing tools</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-2xl md:hidden">Join our platform</CardTitle>
              <CardDescription className="md:hidden">Create an account to access all features</CardDescription>
              <CardTitle className="hidden md:block">Create your account</CardTitle>
              <CardDescription className="hidden md:block">Fill in your details to get started</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="John" className="pl-9" {...field} />
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                                className="pr-10"
                                {...field}
                                onChange={(e) => onPasswordChange(e)}
                              />
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
                          <div className="mt-2 space-y-2">
                            <Progress value={passwordStrength} className="h-1" />
                            <div className="flex justify-between text-xs">
                              <span>Weak</span>
                              <span>Strong</span>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="••••••••" type={showPassword ? "text" : "password"} {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="+255 000 000 000" type="tel" className="pl-9" {...field} />
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Account Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="customer" id="customer" />
                                <Label htmlFor="customer">Customer</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="vendor" id="vendor" />
                                <Label htmlFor="vendor">Vendor</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              I agree to the{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button className="w-full" type="submit" disabled={mutation.isPending} size="lg">
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
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

