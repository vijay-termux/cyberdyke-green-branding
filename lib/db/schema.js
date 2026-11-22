import { pgTable, uuid, text, varchar, timestamp, date, jsonb, integer, boolean } from 'drizzle-orm/pg-core'

const createdAt = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
const updatedAt = () => timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').primaryKey().defaultRandom(), fullName: text('full_name').notNull(), email: text('email').notNull(), phone: text('phone').notNull().default(''), company: text('company').notNull().default(''), service: text('service').notNull().default(''), budget: text('budget').notNull().default(''), message: text('message').notNull(), status: text('status').notNull().default('new'), privateNotes: text('private_notes').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const trainingApplications = pgTable('training_applications', {
  id: uuid('id').primaryKey().defaultRandom(), fullName: text('full_name').notNull(), email: text('email').notNull(), phone: text('phone').notNull(), course: text('course').notNull(), education: text('education').notNull().default(''), college: text('college').notNull().default(''), mode: text('mode').notNull().default(''), message: text('message').notNull().default(''), status: text('status').notNull().default('new'), privateNotes: text('private_notes').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const internshipApplications = pgTable('internship_applications', {
  id: uuid('id').primaryKey().defaultRandom(), fullName: text('full_name').notNull(), email: text('email').notNull(), phone: text('phone').notNull(), college: text('college').notNull().default(''), qualification: text('qualification').notNull().default(''), domain: text('domain').notNull().default(''), skills: text('skills').notNull().default(''), resumePath: text('resume_path').notNull().default(''), duration: text('duration').notNull().default(''), message: text('message').notNull().default(''), status: text('status').notNull().default('new'), privateNotes: text('private_notes').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const careerApplications = pgTable('career_applications', {
  id: uuid('id').primaryKey().defaultRandom(), fullName: text('full_name').notNull(), email: text('email').notNull(), phone: text('phone').notNull(), position: text('position').notNull(), experience: text('experience').notNull().default(''), skills: text('skills').notNull().default(''), resumePath: text('resume_path').notNull().default(''), linkedinUrl: text('linkedin_url').notNull().default(''), message: text('message').notNull().default(''), status: text('status').notNull().default('new'), privateNotes: text('private_notes').notNull().default(''), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(), studentCode: text('student_code').notNull().unique(), fullName: text('full_name').notNull(), email: text('email').notNull().default(''), phone: text('phone').notNull().default(''), profileImagePath: text('profile_image_path').notNull().default(''), education: jsonb('education').notNull().default({}), training: jsonb('training').notNull().default({}), skills: text('skills').array().notNull().default([]), portfolioUrl: text('portfolio_url').notNull().default(''), visibility: text('visibility').notNull().default('private'), status: text('status').notNull().default('enrolled'), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const trainingPrograms = pgTable('training_programs', {
  id: uuid('id').primaryKey().defaultRandom(), title: text('title').notNull(), slug: text('slug').notNull(), category: text('category').notNull().default('general'), summary: text('summary').notNull().default(''), description: text('description').notNull().default(''), curriculum: jsonb('curriculum').notNull().default([]), duration: text('duration').notNull().default(''), level: text('level').notNull().default('beginner'), format: text('format').notNull().default('online'), feeDetails: text('fee_details').notNull().default(''), status: text('status').notNull().default('draft'), sortOrder: integer('sort_order').notNull().default(0), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const internships = pgTable('internships', {
  id: uuid('id').primaryKey().defaultRandom(), title: text('title').notNull(), slug: text('slug').notNull(), category: text('category').notNull().default('general'), summary: text('summary').notNull().default(''), description: text('description').notNull().default(''), location: text('location').notNull().default('Hyderabad, Telangana'), workMode: text('work_mode').notNull().default('hybrid'), duration: text('duration').notNull().default(''), applicationUrl: text('application_url').notNull().default(''), applicationEmail: text('application_email').notNull().default(''), status: text('status').notNull().default('draft'), closingDate: date('closing_date'), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const careerOpenings = pgTable('career_openings', {
  id: uuid('id').primaryKey().defaultRandom(), title: text('title').notNull(), slug: text('slug').notNull(), department: text('department').notNull().default('general'), employmentType: text('employment_type').notNull().default('full-time'), experience: text('experience').notNull().default(''), location: text('location').notNull().default('Hyderabad, Telangana'), workMode: text('work_mode').notNull().default('hybrid'), summary: text('summary').notNull().default(''), description: text('description').notNull().default(''), applicationEmail: text('application_email').notNull().default(''), status: text('status').notNull().default('draft'), closingDate: date('closing_date'), createdAt: createdAt(), updatedAt: updatedAt(),
})

export const certificateRecords = pgTable('certificate_records', {
  certificateId: text('certificate_id').primaryKey(), recipientName: text('recipient_name').notNull(), programTitle: text('program_title').notNull(), issuedOn: date('issued_on').notNull(), expiresOn: date('expires_on'), issuer: text('issuer').notNull().default('CyberdykeTech'), pdfPath: text('pdf_path').notNull().default(''), status: text('status').notNull().default('valid'), createdAt: createdAt(), updatedAt: updatedAt(),
})
