import React, { useState } from 'react'
import Layout from '../components/Layout'
import { MapPin, Users, Clock, Search, Filter } from 'lucide-react'

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

const Venues: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCapacity, setFilterCapacity] = useState('all')

  const venues: Venue[] = [
    {
      id: '1',
      name: 'Main Auditorium',
      type: 'Auditorium',
      capacity: 500,
      status: 'available',
      image: '/api/placeholder/400/200',
      amenities: ['Projector', 'Sound System', 'AC', 'Stage'],
      location: 'Ground Floor, Main Building'
    },
    {
      id: '2',
      name: 'Seminar Hall A',
      type: 'Seminar Hall',
      capacity: 100,
      status: 'available',
      image: '/api/placeholder/400/200',
      amenities: ['Projector', 'Whiteboard', 'AC'],
      location: 'First Floor, Academic Block'
    },
    {
      id: '3',
      name: 'Seminar Hall B',
      type: 'Seminar Hall',
      capacity: 80,
      status: 'booked',
      image: '/api/placeholder/400/200',
      amenities: ['Smart Board', 'AC', 'Video Conferencing'],
      location: 'First Floor, Academic Block'
    },
    {
      id: '4',
      name: 'Computer Lab 1',
      type: 'Lab',
      capacity: 40,
      status: 'maintenance',
      image: '/api/placeholder/400/200',
      amenities: ['40 Computers', 'Projector', 'AC'],
      location: 'Second Floor, IT Building'
    },
    {
      id: '5',
      name: 'Computer Lab 2',
      type: 'Lab',
      capacity: 40,
      status: 'available',
      image: '/api/placeholder/400/200',
      amenities: ['40 Computers', 'Smart Board', 'AC'],
      location: 'Second Floor, IT Building'
    },
    {
      id: '6',
      name: 'Conference Room',
      type: 'Meeting Room',
      capacity: 20,
      status: 'available',
      image: '/api/placeholder/400/200',
      amenities: ['Video Conferencing', 'Whiteboard', 'AC'],
      location: 'Third Floor, Admin Building'
    }
  ]

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'booked':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'maintenance':
        return `${baseClasses} bg-orange-100 text-orange-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
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
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Venues</h1>
          <p className="text-gray-600">
            Browse available venues and check their availability
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Seminar Hall">Seminar Hall</option>
                <option value="Lab">Lab</option>
                <option value="Classroom">Classroom</option>
                <option value="Meeting Room">Meeting Room</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <select
                value={filterCapacity}
                onChange={(e) => setFilterCapacity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (≤50)</option>
                <option value="medium">Medium (51-150)</option>
                <option value="large">Large (>150)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover bg-gray-200"
                />
                <div className="absolute top-2 right-2">
                  <span className={getStatusBadge(venue.status)}>
                    {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{venue.name}</h3>
                    <p className="text-sm text-gray-600">{venue.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{venue.capacity} capacity</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={venue.status !== 'available'}
                    >
                      <Clock className="w-4 h-4" />
                      Check Availability
                    </button>
                    <button
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      disabled={venue.status !== 'available'}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">No venues found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Venues
