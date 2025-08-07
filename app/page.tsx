"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, Building, Shield } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user data in localStorage for demo purposes
    const userData = {
      email,
      role,
      name: email.split('@')[0],
      id: Math.random().toString(36).substr(2, 9)
    }
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  const roleIcons = {
    student: GraduationCap,
    faculty: Users,
    club: Building,
    admin: Shield
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Smart Campus Utility</CardTitle>
          <CardDescription>Venue Booking System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="student" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="faculty" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Faculty
                    </div>
                  </SelectItem>
                  <SelectItem value="club" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Club Representative
                    </div>
                  </SelectItem>
                  <SelectItem value="admin" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-500 rounded-md p-1.5">
              <Button
                type="submit"
                className="w-full bg-blue-500 text-black hover:bg-blue-600 rounded-md py-2"
                disabled={!email || !password || !role}
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}