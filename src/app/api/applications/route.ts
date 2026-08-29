import { NextResponse } from 'next/server';
import { sendRecruiterApplicationEmail, getCompanyRecruiterEmail } from '@/utils/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.applicantName || !body.applicantEmail || !body.jobTitle) {
      return NextResponse.json(
        { success: false, message: 'Applicant name, email, and job title are required' },
        { status: 400 }
      );
    }

    const trackingCode = `KOL-${Math.floor(100000 + Math.random() * 900000)}`;
    const recruiterEmail = getCompanyRecruiterEmail(body.companyName || '');

    const application = {
      ...body,
      id: `app-${Date.now()}`,
      trackingCode,
      appliedAt: new Date().toISOString(),
      status: 'Transmitted to Recruiter',
      recruiterInbox: recruiterEmail,
    };

    // Dispatch email notification to employer's Kolkata talent inbox & confirmation to candidate
    const mailResult = await sendRecruiterApplicationEmail({
      trackingCode,
      applicantName: body.applicantName,
      applicantEmail: body.applicantEmail,
      applicantPhone: body.applicantPhone,
      applicantLinkedIn: body.applicantLinkedIn,
      applicantGitHub: body.applicantGitHub,
      applicantPortfolio: body.applicantPortfolio,
      experienceLevel: body.experienceLevel || 'Not Specified',
      expectedSalary: body.expectedSalary,
      coverNote: body.coverNote,
      resumeFileName: body.resumeFileName || 'Candidate_Resume.pdf',
      jobTitle: body.jobTitle,
      jobCategory: body.jobCategory,
      jobLocationArea: body.jobLocationArea || 'Kolkata Tech Hub',
      companyId: body.companyId || '',
      companyName: body.companyName || 'Kolkata Tech Employer',
    });

    return NextResponse.json({
      success: true,
      message: `Application successfully dispatched to ${body.companyName} Talent Acquisition inbox (${recruiterEmail}).`,
      trackingCode,
      dispatchedTo: recruiterEmail,
      transmissionChannel: mailResult.channel,
      application,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process application' },
      { status: 500 }
    );
  }
}

