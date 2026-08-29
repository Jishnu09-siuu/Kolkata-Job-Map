import { NextResponse } from 'next/server';
import { KOLKATA_COMPANIES } from '@/data/kolkataData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const fresher = searchParams.get('fresher') === 'true';
  const query = searchParams.get('q')?.toLowerCase();

  let allJobs = KOLKATA_COMPANIES.flatMap(c => c.jobs);

  if (category && category !== 'ALL') {
    allJobs = allJobs.filter(j => j.category === category);
  }

  if (fresher) {
    allJobs = allJobs.filter(j => j.isFresherEligible);
  }

  if (query) {
    allJobs = allJobs.filter(j => 
      j.title.toLowerCase().includes(query) ||
      j.skills.some(s => s.toLowerCase().includes(query)) ||
      j.locationArea.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: allJobs.length,
    timestamp: new Date().toISOString(),
    jobs: allJobs,
  });
}
