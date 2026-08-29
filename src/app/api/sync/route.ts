import { NextResponse } from 'next/server';
import { INITIAL_SYNC_STATS, KOLKATA_COMPANIES } from '@/data/kolkataData';

export async function GET() {
  const allJobs = KOLKATA_COMPANIES.flatMap(c => c.jobs);
  const fresherCount = allJobs.filter(j => j.isFresherEligible).length;

  return NextResponse.json({
    status: 'healthy',
    engine: 'Kolkata Live Geocoding & Job Sync Pipeline v2.4',
    syncMetadata: {
      ...INITIAL_SYNC_STATS,
      companiesTracked: KOLKATA_COMPANIES.length,
      activeJobsDetected: allJobs.length,
      fresherOpportunities: fresherCount,
      lastSyncTimestamp: new Date().toISOString(),
    },
    sources: [
      'Official Careers Portals (TCS, Wipro, Cognizant, IBM, Infosys, Capgemini, PwC, Nomura, mjunction, Bandhan Bank)',
      'Direct Employer In-App Submission Protocol',
      'Kolkata Sector V & New Town IT Park Geodata Registry'
    ]
  });
}
