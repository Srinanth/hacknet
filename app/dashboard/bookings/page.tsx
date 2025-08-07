"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Booking {
  id: string
  venue: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'rejected'
  event: string
  attendees: number
  description: string
  submittedAt: string
}

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const bookings: Booking[] = [
    {
      id: '1',
      venue: 'Main Auditorium',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      status: 'approved',
      event: 'Tech Conference 2024',
      attendees: 200,
      description: 'Annual technology conference featuring industry experts and latest innovations.',
      submittedAt: '2024-01-10'
    },
    {
      id: '2',
      venue: 'Seminar Hall A',
      date: '2024-01-18',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
      event: 'Workshop on AI',
      attendees: 50,
      description: 'Interactive workshop on artificial intelligence and machine learning.',
      submittedAt: '2024-01-12'
    },
    {
      id: '3',
      venue: 'Computer Lab 1',
      date: '2024-01-12',
      time: '9:00 AM - 11:00 AM',
      status: 'rejected',
      event: 'Programming Contest',
      attendees: 30,
      description: 'Competitive programming contest for computer science students.',
      submittedAt: '2024-01-08'
    },
    {
      id: '4',
      venue: 'Conference Room',
      date: '2024-01-25',
      time: '3:00 PM - 5:00 PM',
      status: 'pending',
      event: 'Project Review Meeting',
      attendees: 15,
      description: 'Final year project review and evaluation meeting.',
      submittedAt: '2024-01-14'
    },
    {
      id: '5',
      venue: 'Classroom 101',
      date: '2024-01-08',
      time: '11:00 AM - 1:00 PM',
      status: 'approved',
      event: 'Guest Lecture',
      attendees: 45,
      description: 'Guest lecture by industry professional on software development.',
      submittedAt: '2024-01-05'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  const filterBookings = (status?: string) => {
    if (!status) return bookings
    return bookings.filter(booking => booking.status === status)
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getStatusIcon(booking.status)}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{booking.event}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {booking.description}
              </p>
            </div>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{booking.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{booking.attendees} attendees</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Submitted on {booking.submittedAt}
          </p>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Booking Details</DialogTitle>
                  <DialogDescription>
                    Complete information about your booking request
                  </DialogDescription>
                </DialogHeader>
                {selectedBooking && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{selectedBooking.event}</h3>
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Venue</label>
                        <p className="font-medium">{selectedBooking.venue}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p className="font-medium">{selectedBooking.date}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Time</label>
                        <p className="font-medium">{selectedBooking.time}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Attendees</label>
                        <p className="font-medium">{selectedBooking.attendees}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Description</label>
                      <p className="text-sm">{selectedBooking.description}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                      <p className="text-sm">{selectedBooking.submittedAt}</p>
                    </div>

                    {selectedBooking.status === 'rejected' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Rejection Reason</h4>
                        <p className="text-sm text-red-700">
                          The venue is not available for the requested time slot. Please choose a different time or venue.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
            {booking.status === 'pending' && (
              <>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">
            Track and manage your venue booking requests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filterBookings('approved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {filterBookings('pending').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterBookings('pending').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filterBookings('approved').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterBookings('rejected').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
