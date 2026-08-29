'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Company, OfficeLocation } from '@/types';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  Navigation,
  Compass,
  Plus,
  Minus,
  Layers,
  Route,
  X,
} from 'lucide-react';
import { generateRoutePoints } from '@/utils/commute';

export const KolkataMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletLibRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const markersMapRef = useRef<{ [key: string]: any }>({});
  const userMarkerRef = useRef<any>(null);
  const routePolylineRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  const { 
    filteredCompanies, 
    selectedCompany, 
    selectedLocation, 
    selectCompany, 
    mapFocus,
    flyToLocation,
    userLocation,
    commuteMode,
    getCommuteForLocation,
    activeRouteDestination,
    clearActiveRoute,
    setIsLocationModalOpen
  } = useApp();

  // Initialize Leaflet Map with High-Performance Settings
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;
      leafletLibRef.current = L;

      if (!mapInstanceRef.current && isMounted && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [22.5800, 88.4450],
          zoom: 13,
          minZoom: 10,
          maxZoom: 18,
          zoomControl: false,
          preferCanvas: true,
          fadeAnimation: true,
          zoomAnimation: true,
          markerZoomAnimation: true,
          wheelDebounceTime: 30,
          wheelPxPerZoomLevel: 100,
        });

        // Clean & Fast OpenStreetMap Standard Tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 19,
          updateWhenIdle: true,
          updateWhenZooming: false,
          keepBuffer: 6,
        }).addTo(map);

        // Dedicated LayerGroup for ultra-fast batch marker updates
        const markersGroup = L.layerGroup().addTo(map);
        markersLayerRef.current = markersGroup;

        mapInstanceRef.current = map;
        setMapReady(true);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  // Smooth Flying Focus
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !mapFocus) return;
    mapInstanceRef.current.flyTo([mapFocus.lat, mapFocus.lng], mapFocus.zoom, {
      duration: 0.8,
      easeLinearity: 0.35,
    });
  }, [mapFocus, mapReady]);

  // Update User Location Marker
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !leafletLibRef.current) return;

    const L = leafletLibRef.current;
    const map = mapInstanceRef.current;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    const userHtml = `
      <div class="relative group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
        <div class="w-6 h-6 rounded-full bg-zinc-900 border-2 border-zinc-400 shadow-lg flex items-center justify-center text-white text-[10px]">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>
        <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
          Starting Location: ${userLocation.name.split('/')[0]}
        </div>
      </div>
    `;

    const userIcon = L.divIcon({
      html: userHtml,
      className: 'user-location-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const marker = L.marker([userLocation.latitude, userLocation.longitude], {
      icon: userIcon,
      zIndexOffset: 1000,
    });

    marker.on('click', () => {
      setIsLocationModalOpen(true);
    });

    marker.addTo(map);
    userMarkerRef.current = marker;
  }, [userLocation, mapReady]);

  // Render Polyline Route when active
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !leafletLibRef.current) return;

    const L = leafletLibRef.current;
    const map = mapInstanceRef.current;

    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    if (activeRouteDestination) {
      const points = generateRoutePoints(
        userLocation.latitude,
        userLocation.longitude,
        activeRouteDestination.latitude,
        activeRouteDestination.longitude
      );

      const polyline = L.polyline(points, {
        color: '#18181b',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 6',
        lineCap: 'round',
      }).addTo(map);

      routePolylineRef.current = polyline;
    }
  }, [activeRouteDestination, userLocation, mapReady]);

  // Fast Batch Company Markers Update
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !leafletLibRef.current || !markersLayerRef.current) return;

    const L = leafletLibRef.current;
    const markersGroup = markersLayerRef.current;

    // Fast clear of all markers via LayerGroup
    markersGroup.clearLayers();
    markersMapRef.current = {};

    // Batch insert markers
    filteredCompanies.forEach((company) => {
      company.locations.forEach((loc) => {
        const isSelected = selectedCompany?.id === company.id && selectedLocation?.id === loc.id;
        const isHiring = company.hiringStatus === 'hiring';
        const isFresher = company.fresherJobCount > 0;
        const commute = getCommuteForLocation(loc.latitude, loc.longitude);

        const customHtml = `
          <div class="relative group cursor-pointer transform -translate-x-1/2 -translate-y-full transition-transform duration-150 hover:scale-105" style="will-change: transform;">
            
            ${isFresher ? `
              <div class="absolute -top-2 -left-2 bg-zinc-800 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border border-white shadow-sm flex items-center z-20">
                <span>NEW</span>
              </div>
            ` : ''}

            <!-- Pin Card Shell -->
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-xl shadow-sm border ${
              isSelected 
                ? 'bg-zinc-950 text-white border-zinc-950 ring-2 ring-zinc-950 scale-105' 
                : 'bg-white text-zinc-900 border-zinc-300 hover:border-zinc-500'
            } transition-all">
              
              <div class="w-5 h-5 rounded-md overflow-hidden bg-zinc-100 flex items-center justify-center flex-shrink-0">
                <img src="${company.logo}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=40&h=40&fit=crop'" />
              </div>

              <div class="flex flex-col text-left pr-0.5">
                <span class="text-[11px] font-semibold tracking-tight whitespace-nowrap leading-none">
                  ${company.name.length > 14 ? company.name.substring(0, 12) + '...' : company.name}
                </span>
                <span class="text-[9px] ${isSelected ? 'text-zinc-300' : 'text-zinc-500'} leading-tight mt-0.5">
                  ${commute.formattedTime} / ${isHiring ? `${company.activeJobCount} jobs` : 'Verified'}
                </span>
              </div>

            </div>

            <!-- Pin Pointer Triangle -->
            <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
              isSelected ? 'bg-zinc-950' : 'bg-white border-r border-b border-zinc-300'
            }"></div>

          </div>
        `;

        const customIcon = L.divIcon({
          html: customHtml,
          className: 'custom-leaflet-marker',
          iconSize: [120, 42],
          iconAnchor: [60, 42],
          popupAnchor: [0, -42],
        });

        const marker = L.marker([loc.latitude, loc.longitude], { 
          icon: customIcon,
          zIndexOffset: isSelected ? 500 : 10,
        });

        const popupContent = `
          <div class="p-3 max-w-xs font-sans">
            <div class="flex items-center gap-2 mb-1.5">
              <img src="${company.logo}" class="w-6 h-6 rounded-md object-cover border border-zinc-200" />
              <div>
                <h4 class="text-xs font-bold text-zinc-900 leading-tight">${company.name}</h4>
                <p class="text-[10px] text-zinc-500">${company.industry}</p>
              </div>
            </div>
            
            <div class="text-[11px] text-zinc-600 space-y-1 mb-2 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
              <div class="font-medium text-zinc-800">
                <span>${loc.buildingName}</span>
              </div>
              <div class="text-[10px] text-zinc-800 font-semibold">
                Estimated Commute: ${commute.formattedTime} (${commute.distanceKm} km)
              </div>
            </div>

            <div class="flex items-center justify-between gap-1 text-[10px]">
              <span class="font-medium text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                ${company.activeJobCount} Active Roles
              </span>
              ${company.fresherJobCount > 0 ? `
                <span class="font-medium text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                  ${company.fresherJobCount} Fresher Roles
                </span>
              ` : ''}
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: false,
          offset: [0, -10],
        });

        marker.on('click', () => {
          selectCompany(company, loc);
        });

        markersGroup.addLayer(marker);
        markersMapRef.current[`${company.id}-${loc.id}`] = marker;
      });
    });
  }, [filteredCompanies, selectedCompany?.id, selectedLocation?.id, mapReady, userLocation, commuteMode]);

  // Zoom control handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetKolkata = () => {
    flyToLocation(22.5800, 88.4450, 13);
  };

  const activeCommute = activeRouteDestination 
    ? getCommuteForLocation(activeRouteDestination.latitude, activeRouteDestination.longitude) 
    : null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-100">
      
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Active Route Banner (Top Center) */}
      {activeRouteDestination && activeCommute && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-zinc-950 text-white px-4 py-2.5 rounded-2xl shadow-floating border border-zinc-800 flex items-center gap-3 text-xs">
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>Route: {userLocation.name.split('/')[0]} → {activeRouteDestination.buildingName}</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              {activeCommute.formattedTime} ({activeCommute.distanceKm} km) via {commuteMode.replace('_', ' ')}
            </div>
          </div>

          <button
            onClick={clearActiveRoute}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Clear Route"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating User Location Bar (Top-Left) */}
      <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-subtle border border-zinc-200/90 hover:border-zinc-400 text-xs font-semibold text-zinc-900 transition-all cursor-pointer"
          title="Click to change your starting Kolkata locality"
        >
          <MapPin className="w-3.5 h-3.5 text-zinc-700" />
          <span>From: {userLocation.name.split('/')[0]}</span>
          <span className="text-[10px] text-zinc-400 font-normal underline">Change</span>
        </button>
      </div>

      {/* Floating Zoom & Compass Controls (Right) */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-1.5 shadow-subtle">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center border border-zinc-200/80 backdrop-blur-md shadow-sm transition-all"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center border border-zinc-200/80 backdrop-blur-md shadow-sm transition-all"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetKolkata}
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center border border-zinc-200/80 backdrop-blur-md shadow-sm transition-all"
          title="Recenter Kolkata"
        >
          <Compass className="w-4 h-4 text-zinc-700" />
        </button>
      </div>

      {/* Floating Corridor Quick Jump Bar (Bottom Map Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-premium border border-zinc-200/80">
        <span className="text-[11px] font-semibold text-zinc-500 px-2 flex items-center gap-1">
          <Navigation className="w-3 h-3 text-zinc-700" />
          Hubs:
        </span>
        
        <button
          onClick={() => flyToLocation(22.5765, 88.4343, 15)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
        >
          Sector V
        </button>
        <button
          onClick={() => flyToLocation(22.6072, 88.4725, 14)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
        >
          New Town
        </button>
        <button
          onClick={() => flyToLocation(22.5532, 88.3524, 15)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
        >
          Park Street
        </button>
        <button
          onClick={() => flyToLocation(22.5147, 88.3932, 15)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
        >
          Kasba
        </button>
        <button
          onClick={() => flyToLocation(22.5186, 88.4410, 14)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
        >
          Bantala SEZ
        </button>
      </div>

    </div>
  );
};


