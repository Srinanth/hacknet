"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface User {
  email: string
  role: string
  name: string
  id: string
}

interface Booking {
  id: string
  venue: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  event: string
  attendees: number
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Sample bookings data
    setBookings([
      {
        id: "1",
        venue: "Main Auditorium",
        date: "2024-01-15",
        time: "10:00 AM - 12:00 PM",
        status: "approved",
        event: "Tech Conference 2024",
        attendees: 200,
      },
      {
        id: "2",
        venue: "Seminar Hall A",
        date: "2024-01-18",
        time: "2:00 PM - 4:00 PM",
        status: "pending",
        event: "Workshop on AI",
        attendees: 50,
      },
      {
        id: "3",
        venue: "Computer Lab 1",
        date: "2024-01-12",
        time: "9:00 AM - 11:00 AM",
        status: "rejected",
        event: "Programming Contest",
        attendees: 30,
      },
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: bookings.filter((b) => b.status === "approved").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      title: "This Month",
      value: bookings.length,
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">
              Manage your venue bookings and track requests
            </p>
          </div>
          <Link href="/dashboard/book-venue">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Booking
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Your latest venue booking requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getStatusIcon(booking.status)}</div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold">{booking.event}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.venue}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {booking.attendees} attendees
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
