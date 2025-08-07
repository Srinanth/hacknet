"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Building, Calendar, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

interface Venue {
  id: string
  name: string
  type: string
  capacity: number
  status: 'available' | 'maintenance'
}

interface BookingRequest {
  id: string
  user: string
  venue: string
  date: string
  time: string
  event: string
  attendees: number
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [venues, setVenues] = useState<Venue[]>([])
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null)

  useEffect(() => {
    // Sample data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@college.edu', role: 'student', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@college.edu', role: 'faculty', status: 'active' },
      { id: '3', name: 'Mike Johnson', email: 'mike@college.edu', role: 'club', status: 'active' },
      { id: '4', name: 'Sarah Wilson', email: 'sarah@college.edu', role: 'student', status: 'inactive' }
    ])

    setVenues([
      { id: '1', name: 'Main Auditorium', type: 'Auditorium', capacity: 500, status: 'available' },
      { id: '2', name: 'Seminar Hall A', type: 'Seminar Hall', capacity: 100, status: 'available' },
      { id: '3', name: 'Computer Lab 1', type: 'Lab', capacity: 40, status: 'maintenance' },
      { id: '4', name: 'Conference Room', type: 'Meeting Room', capacity: 20, status: 'available' }
    ])

    setBookings([
      {
        id: '1',
        user: 'John Doe',
        venue: 'Main Auditorium',
        date: '2024-01-15',
        time: '10:00 AM - 12:00 PM',
        event: 'Tech Conference 2024',
        attendees: 200,
        status: 'pending',
        submittedAt: '2024-01-10'
      },
      {
        id: '2',
        user: 'Jane Smith',
        venue: 'Seminar Hall A',
        date: '2024-01-18',
        time: '2:00 PM - 4:00 PM',
        event: 'Workshop on AI',
        attendees: 50,
        status: 'approved',
        submittedAt: '2024-01-08'
      },
      {
        id: '3',
        user: 'Mike Johnson',
        venue: 'Computer Lab 1',
        date: '2024-01-20',
        time: '9:00 AM - 11:00 AM',
        event: 'Programming Contest',
        attendees: 30,
        status: 'rejected',
        submittedAt: '2024-01-09'
      }
    ])
  }, [])

  const handleBookingAction = (bookingId: string, action: 'approve' | 'reject') => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === 'approve' ? 'approved' : 'rejected' }
        : booking
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Venues",
      value: venues.length,
      icon: Building,
      color: "text-green-600"
    },
    {
      title: "Pending Requests",
      value: bookings.filter(b => b.status === 'pending').length,
      icon: AlertCircle,
      color: "text-yellow-600"
    },
    {
      title: "This Month",
      value: bookings.length,
      icon: Calendar,
      color: "text-purple-600"
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, venues, and booking requests
          </p>
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

        {/* Management Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
          </TabsList>

          {/* Booking Requests */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>
                  Review and manage venue booking requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.event}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.venue}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedBooking(booking)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Booking Details</DialogTitle>
                                  <DialogDescription>
                                    Review the booking request details
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedBooking && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Event Name</Label>
                                        <p className="font-medium">{selectedBooking.event}</p>
                                      </div>
                                      <div>
                                        <Label>Requested by</Label>
                                        <p className="font-medium">{selectedBooking.user}</p>
                                      </div>
                                      <div>
                                        <Label>Venue</Label>
                                        <p className="font-medium">{selectedBooking.venue}</p>
                                      </div>
                                      <div>
                                        <Label>Date</Label>
                                        <p className="font-medium">{selectedBooking.date}</p>
                                      </div>
                                      <div>
                                        <Label>Time</Label>
                                        <p className="font-medium">{selectedBooking.time}</p>
                                      </div>
                                      <div>
                                        <Label>Attendees</Label>
                                        <p className="font-medium">{selectedBooking.attendees}</p>
                                      </div>
                                    </div>
                                    {selectedBooking.status === 'pending' && (
                                      <div className="flex gap-2 pt-4">
                                        <Button 
                                          onClick={() => handleBookingAction(selectedBooking.id, 'approve')}
                                          className="flex-1"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Approve
                                        </Button>
                                        <Button 
                                          variant="destructive"
                                          onClick={() => handleBookingAction(selectedBooking.id, 'reject')}
                                          className="flex-1"
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />
                                          Reject
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {booking.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleBookingAction(booking.id, 'approve')}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleBookingAction(booking.id, 'reject')}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    Manage system users and their roles
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Venues Management */}
          <TabsContent value="venues">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Venues</CardTitle>
                  <CardDescription>
                    Manage available venues and their details
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Venue
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {venues.map((venue) => (
                      <TableRow key={venue.id}>
                        <TableCell className="font-medium">{venue.name}</TableCell>
                        <TableCell>{venue.type}</TableCell>
                        <TableCell>{venue.capacity}</TableCell>
                        <TableCell>{getStatusBadge(venue.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
