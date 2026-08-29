'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  MapPin, 
  Navigation, 
  LocateFixed, 
  Check, 
  Search, 
  Train, 
  Car, 
  Bike, 
  Footprints,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PRESET_KOLKATA_LOCATIONS } from '@/utils/commute';
import { CommuteMode, UserLocation } from '@/types';

export const UserLocationModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    userLocation, 
    setUserLocation,
    commuteMode,
    setCommuteMode,
    flyToLocation
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsError, setGpsError] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredLocalities = PRESET_KOLKATA_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (loc: UserLocation) => {
    setUserLocation(loc);
    flyToLocation(loc.latitude, loc.longitude, 13);
    setIsLocationModalOpen(false);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsGettingGps(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const customLoc: UserLocation = {
          name: 'My GPS Location (Kolkata)',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isCustomGps: true,
        };
        setUserLocation(customLoc);
        flyToLocation(pos.coords.latitude, pos.coords.longitude, 14);
        setIsGettingGps(false);
        setIsLocationModalOpen(false);
      },
      (err) => {
        setIsGettingGps(false);
        setGpsError('Could not retrieve GPS location. Please select a Kolkata locality below.');
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLocationModalOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 p-5 sm:p-6 space-y-5">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                <Navigation className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Set Your Starting Location
                </h3>
                <p className="text-xs text-zinc-500">
                  Calculate accurate commute times to tech offices across Kolkata
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Commute Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
              Preferred Travel Mode
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { mode: 'transit' as CommuteMode, label: 'Metro / Transit', icon: Train },
                { mode: 'driving' as CommuteMode, label: 'Driving (Car)', icon: Car },
                { mode: 'two_wheeler' as CommuteMode, label: 'Two Wheeler', icon: Bike },
                { mode: 'walking' as CommuteMode, label: 'Walking', icon: Footprints },
              ].map(({ mode, label, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setCommuteMode(mode)}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                    commuteMode === mode
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                      : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${commuteMode === mode ? 'text-white' : 'text-zinc-600'}`} />
                  <span className="text-[11px] font-semibold leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* GPS Button */}
          <div>
            <button
              onClick={handleUseCurrentLocation}
              disabled={isGettingGps}
              className="w-full p-3 rounded-xl border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <LocateFixed className={`w-4 h-4 text-zinc-800 ${isGettingGps ? 'animate-spin' : ''}`} />
              <span>{isGettingGps ? 'Locating via GPS...' : 'Use My Current Live Location'}</span>
            </button>
            {gpsError && (
              <p className="text-[11px] text-red-600 mt-1 text-center">{gpsError}</p>
            )}
          </div>

          {/* Search Localities */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kolkata locality (e.g. Howrah, Garia, Dum Dum, Behala)..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none focus:border-zinc-400"
              />
            </div>

            {/* Localities List */}
            <div className="max-h-52 overflow-y-auto divide-y divide-zinc-100 border border-zinc-200 rounded-xl">
              {filteredLocalities.map((loc) => {
                const isSelected = userLocation.name === loc.name;

                return (
                  <button
                    key={loc.name}
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full p-2.5 text-left text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white'
                        : 'hover:bg-zinc-50 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                      <span className="font-medium">{loc.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-[11px] text-zinc-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />
            <p>
              Your location is stored solely in your local browser storage to estimate travel distances. It is never broadcasted or shared publicly.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
