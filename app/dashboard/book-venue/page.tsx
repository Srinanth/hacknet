"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Users, CheckCircle } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function BookVenue() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedVenue, setSelectedVenue] = useState("")
  const [eventName, setEventName] = useState("")
  const [description, setDescription] = useState("")
  const [attendees, setAttendees] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const venues = [
    { id: "main-auditorium", name: "Main Auditorium", capacity: 500, type: "Auditorium" },
    { id: "seminar-hall-a", name: "Seminar Hall A", capacity: 100, type: "Seminar Hall" },
    { id: "seminar-hall-b", name: "Seminar Hall B", capacity: 80, type: "Seminar Hall" },
    { id: "computer-lab-1", name: "Computer Lab 1", capacity: 40, type: "Lab" },
    { id: "computer-lab-2", name: "Computer Lab 2", capacity: 40, type: "Lab" },
    { id: "classroom-101", name: "Classroom 101", capacity: 60, type: "Classroom" },
    { id: "classroom-102", name: "Classroom 102", capacity: 60, type: "Classroom" },
    { id: "conference-room", name: "Conference Room", capacity: 20, type: "Meeting Room" }
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    console.log({
      venue: selectedVenue,
      date: selectedDate,
      startTime,
      endTime,
      eventName,
      description,
      attendees
    })
  }

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Request Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your venue booking request has been submitted successfully. You will receive a notification once it's reviewed by the admin.
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Request Details:</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Event:</strong> {eventName}</p>
                  <p><strong>Venue:</strong> {venues.find(v => v.id === selectedVenue)?.name}</p>
                  <p><strong>Date:</strong> {selectedDate ? format(selectedDate, "PPP") : ""}</p>
                  <p><strong>Time:</strong> {startTime} - {endTime}</p>
                  <p><strong>Attendees:</strong> {attendees}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setSubmitted(false)}>
                  Submit Another Request
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Book a Venue</h1>
          <p className="text-muted-foreground">
            Submit a request to book a venue for your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Provide information about your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name *</Label>
                  <Input
                    id="event-name"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Expected Attendees *</Label>
                  <Input
                    id="attendees"
                    type="number"
                    placeholder="Number of attendees"
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Venue Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Selection</CardTitle>
                <CardDescription>
                  Choose your preferred venue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Venue *</Label>
                  <Select value={selectedVenue} onValueChange={setSelectedVenue} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{venue.name}</span>
                            <div className="flex items-center gap-2 ml-2">
                              <Badge variant="secondary">{venue.type}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {venue.capacity} seats
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedVenue && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">
                        {venues.find(v => v.id === selectedVenue)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {venues.find(v => v.id === selectedVenue)?.capacity} people</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Date and Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
              <CardDescription>
                Select your preferred date and time slot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Start Time *</Label>
                  <Select value={startTime} onValueChange={setStartTime} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white bg-opacity-90">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>End Time *</Label>
                  <Select value={endTime} onValueChange={setEndTime} required>
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white bg-opacity-90">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              disabled={!selectedDate || !selectedVenue || !eventName || !attendees || !startTime || !endTime}
            >
              Submit Booking Request
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
