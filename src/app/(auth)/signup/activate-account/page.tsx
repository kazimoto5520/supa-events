"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ActivateAccount = () => {
    const [otp, setOtp] = useState('')
    const [resendTimeout, setResendTimeout] = useState(30)
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    useEffect(() => {
        if (resendTimeout > 0) {
            const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setIsResendDisabled(false)
        }
    }, [resendTimeout])

    const handleResendOtp = () => {
        setResendTimeout(30)
        setIsResendDisabled(true)
        // Logic to resend OTP goes here
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Logic to handle OTP submission goes here
        console.log('Submitted OTP:', otp)
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
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <div>
                        <Label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </Label>
                        <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter your OTP"
                            className="mt-1"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        {isResendDisabled ? (
                            <span>Resend OTP in {resendTimeout}s</span>
                        ) : (
                            <Button
                                type="button"
                                variant="link"
                                onClick={handleResendOtp}
                                className="p-0"
                            >
                                Resend OTP
                            </Button>
                        )}
                    </div>
                </form>
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

export default ActivateAccount