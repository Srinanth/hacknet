"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, Users, Clock, CalendarIcon, Search, Filter } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Venue {
  id: string
  name: string
  type: string
  capacity: number
  status: 'available' | 'booked' | 'maintenance'
  image: string
  amenities: string[]
  location: string
}

export default function VenuesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCapacity, setFilterCapacity] = useState("all")

  const venues: Venue[] = [
    {
      id: '1',
      name: 'Main Auditorium',
      type: 'Auditorium',
      capacity: 500,
      status: 'available',
      image: '/grand-auditorium.png',
      amenities: ['Projector', 'Sound System', 'AC', 'Stage'],
      location: 'Ground Floor, Main Building'
    },
    {
      id: '2',
      name: 'Seminar Hall A',
      type: 'Seminar Hall',
      capacity: 100,
      status: 'available',
      image: '/seminar-hall.png',
      amenities: ['Projector', 'Whiteboard', 'AC'],
      location: 'First Floor, Academic Block'
    },
    {
      id: '3',
      name: 'Seminar Hall B',
      type: 'Seminar Hall',
      capacity: 80,
      status: 'booked',
      image: '/seminar-room.png',
      amenities: ['Smart Board', 'AC', 'Video Conferencing'],
      location: 'First Floor, Academic Block'
    },
    {
      id: '4',
      name: 'Computer Lab 1',
      type: 'Lab',
      capacity: 40,
      status: 'maintenance',
      image: '/computer-lab.png',
      amenities: ['40 Computers', 'Projector', 'AC'],
      location: 'Second Floor, IT Building'
    },
    {
      id: '5',
      name: 'Computer Lab 2',
      type: 'Lab',
      capacity: 40,
      status: 'available',
      image: '/computer-laboratory.png',
      amenities: ['40 Computers', 'Smart Board', 'AC'],
      location: 'Second Floor, IT Building'
    },
    {
      id: '6',
      name: 'Conference Room',
      type: 'Meeting Room',
      capacity: 20,
      status: 'available',
      image: '/modern-conference-room.png',
      amenities: ['Video Conferencing', 'Whiteboard', 'AC'],
      location: 'Third Floor, Admin Building'
    },
    {
      id: '7',
      name: 'Classroom 101',
      type: 'Classroom',
      capacity: 60,
      status: 'available',
      image: '/diverse-classroom.png',
      amenities: ['Projector', 'Whiteboard', 'AC'],
      location: 'First Floor, Academic Block'
    },
    {
      id: '8',
      name: 'Classroom 102',
      type: 'Classroom',
      capacity: 60,
      status: 'available',
      image: '/lecture-hall.png',
      amenities: ['Smart Board', 'AC'],
      location: 'First Floor, Academic Block'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case 'booked':
        return <Badge className="bg-red-100 text-red-800">Booked</Badge>
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || venue.type === filterType
    const matchesCapacity = filterCapacity === 'all' || 
                           (filterCapacity === 'small' && venue.capacity <= 50) ||
                           (filterCapacity === 'medium' && venue.capacity > 50 && venue.capacity <= 150) ||
                           (filterCapacity === 'large' && venue.capacity > 150)
    
    return matchesSearch && matchesType && matchesCapacity
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Venues</h1>
          <p className="text-muted-foreground">
            Browse available venues and check their availability
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search venues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
  <SelectItem value="all">All Types</SelectItem>
  <SelectItem value="Auditorium">Auditorium</SelectItem>
  <SelectItem value="Seminar Hall">Seminar Hall</SelectItem>
  <SelectItem value="Lab">Lab</SelectItem>
  <SelectItem value="Classroom">Classroom</SelectItem>
  <SelectItem value="Meeting Room">Meeting Room</SelectItem>
</SelectContent>

                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacity</label>
                <Select value={filterCapacity} onValueChange={setFilterCapacity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
  <SelectItem value="all">All Sizes</SelectItem>
  <SelectItem value="small">Small (≤50)</SelectItem>
  <SelectItem value="medium">Medium (51-150)</SelectItem>
  <SelectItem value="large">Large (&gt;150)</SelectItem>
</SelectContent>

                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
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
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
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
            </div>
          </CardContent>
        </Card>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(venue.status)}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground">{venue.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{venue.capacity} capacity</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      disabled={venue.status !== 'available'}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Check Availability
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={venue.status !== 'available'}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No venues found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
