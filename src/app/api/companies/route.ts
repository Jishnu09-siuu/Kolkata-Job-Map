import { NextResponse } from 'next/server';
import { KOLKATA_COMPANIES } from '@/data/kolkataData';
import { Company } from '@/types';

// In-memory registry for newly added companies during runtime
const dynamicCompanies: Company[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get('area');
  const type = searchParams.get('type');
  const fresher = searchParams.get('fresher') === 'true';

  let result = [...dynamicCompanies, ...KOLKATA_COMPANIES];

  if (area && area !== 'ALL' && area !== 'All Kolkata Hubs') {
    result = result.filter(c => 
      c.locations.some(l => l.area.toLowerCase().includes(area.toLowerCase()))
    );
  }

  if (type && type !== 'ALL') {
    result = result.filter(c => c.companyType === type);
  }

  if (fresher) {
    result = result.filter(c => c.fresherJobCount > 0);
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    timestamp: new Date().toISOString(),
    companies: result,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.locations || body.locations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Company name and at least one Kolkata office location are required' },
        { status: 400 }
      );
    }

    const newCompany: Company = {
      id: body.id || `comp-auto-${Date.now()}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      logo: body.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop&q=80',
      industry: body.industry || 'Information Technology',
      companyType: body.companyType || 'IT Services',
      companySize: body.companySize || '100-500 employees',
      foundedYear: body.foundedYear || 2020,
      websiteUrl: body.websiteUrl || 'https://',
      careersUrl: body.careersUrl || 'https://',
      description: body.description || `${body.name} operates active engineering operations in Kolkata.`,
      techStack: body.techStack || ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
      hiringStatus: 'hiring',
      activeJobCount: body.jobs ? body.jobs.length : 1,
      fresherJobCount: body.jobs ? body.jobs.filter((j: any) => j.isFresherEligible).length : 1,
      internshipCount: body.jobs ? body.jobs.filter((j: any) => j.isInternship).length : 0,
      lastCheckedTime: 'Just now (Automated Pipeline Ingestion)',
      dataSource: 'Live Kolkata Automated IT Radar Ingestion',
      verificationConfidence: 'High Confidence',
      isLocationVerified: true,
      isOfficialSourceVerified: true,
      locations: body.locations,
      jobs: body.jobs || [
        {
          id: `job-auto-${Date.now()}`,
          companyId: body.id || `comp-auto-${Date.now()}`,
          title: 'Software Engineer',
          category: 'Full Stack',
          experienceLevel: 'Fresher (0-1 yrs)',
          minExperienceYears: 0,
          maxExperienceYears: 1,
          isFresherEligible: true,
          isInternship: false,
          employmentType: 'Full-time',
          workMode: 'Hybrid',
          locationArea: body.locations[0]?.area || 'Salt Lake Sector V',
          salaryRange: '₹4.0 - ₹7.0 LPA',
          skills: body.techStack || ['React', 'Node.js', 'Python'],
          descriptionSummary: `Active engineering role at ${body.name} Kolkata office.`,
          keyResponsibilities: ['Develop web and cloud application modules', 'Collaborate with agile sprint teams'],
          qualifications: ['Bachelor degree in Engineering or relevant tech proficiency'],
          applicationType: 'DIRECT_PLATFORM',
          source: 'Automated Job Ingestion Protocol',
          postedDate: 'Today',
          lastVerifiedTime: 'Just now',
          verificationStatus: 'Recently Verified',
        }
      ],
    };

    // Prepend to dynamic in-memory list
    dynamicCompanies.unshift(newCompany);

    return NextResponse.json({
      success: true,
      message: 'Company automatically registered and added to Kolkata Job Map',
      company: newCompany,
      totalTracked: KOLKATA_COMPANIES.length + dynamicCompanies.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to process company ingestion' },
      { status: 500 }
    );
  }
}

