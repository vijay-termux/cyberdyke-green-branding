'use client'

import { useState } from 'react'

const configurations = {
  training: {
    endpoint: '/api/training', title: 'Apply for training', submit: 'Send application',
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'email', label: 'Email address', type: 'email', required: true }, { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'course', label: 'Interested course', required: true, options: ['Cybersecurity Fundamentals', 'Ethical Hacking Fundamentals', 'Web Application Security', 'Incident Response Basics', 'Digital Marketing Fundamentals', 'Social Media Marketing', 'Search Engine Optimization', 'Content Creation', 'Other'] },
      { name: 'education', label: 'Education' }, { name: 'college', label: 'College' }, { name: 'mode', label: 'Training mode', options: ['Online', 'In person', 'Hybrid', 'Flexible'] }, { name: 'message', label: 'Message', multiline: true },
    ],
  },
  internship: {
    endpoint: '/api/internships', title: 'Apply for an internship', submit: 'Submit application',
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'email', label: 'Email address', type: 'email', required: true }, { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'domain', label: 'Interested domain', required: true, options: ['Cybersecurity', 'Digital Marketing', 'Website Development', 'Graphic Design', 'Content Creation', 'Video Editing'] },
      { name: 'college', label: 'College' }, { name: 'qualification', label: 'Qualification' }, { name: 'skills', label: 'Skills', multiline: true }, { name: 'duration', label: 'Preferred duration' }, { name: 'message', label: 'Message', multiline: true },
    ],
  },
  career: {
    endpoint: '/api/careers', title: 'Apply for a role', submit: 'Submit application',
    fields: [
      { name: 'fullName', label: 'Full name', required: true }, { name: 'email', label: 'Email address', type: 'email', required: true }, { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'position', label: 'Position', required: true }, { name: 'experience', label: 'Experience' }, { name: 'skills', label: 'Skills', multiline: true }, { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'url' }, { name: 'message', label: 'Message', multiline: true },
    ],
  },
}

export default function ApplicationForm({ kind }) {
  const config = configurations[kind]
  const initial = Object.fromEntries(config.fields.map(field => [field.name, '']))
  const [values, setValues] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    try {
      const response = await fetch(config.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, website: '' }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit your application.')
      setStatus('sent')
      setMessage('Thank you. Your application was saved successfully.')
      setValues(initial)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Please try again later.')
    }
  }

  return (
    <section id="application" className="bg-[#f5fbf7] py-16 text-[#0b2419]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm md:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">CyberdykeTech</p>
          <h2 className="mt-3 font-sora text-2xl font-bold md:text-3xl">{config.title}</h2>
          <form onSubmit={submit} className="mt-7 grid gap-5 md:grid-cols-2">
            {config.fields.map(field => (
              <label key={field.name} className={`flex flex-col gap-2 text-sm font-medium ${field.multiline ? 'md:col-span-2' : ''}`}>
                <span>{field.label}{field.required ? ' *' : ''}</span>
                {field.options ? (
                  <select required={field.required} value={values[field.name]} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} className="rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600">
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : field.multiline ? (
                  <textarea rows={4} value={values[field.name]} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} className="resize-y rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600" />
                ) : (
                  <input required={field.required} type={field.type || 'text'} value={values[field.name]} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} className="rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600" />
                )}
              </label>
            ))}
            <div className="sr-only" aria-hidden="true"><label>Leave this field empty<input tabIndex={-1} autoComplete="off" value={values.website || ''} onChange={() => {}} /></label></div>
            <div className="md:col-span-2">
              <button type="submit" disabled={status === 'sending'} className="rounded-full bg-[#062817] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60">{status === 'sending' ? 'Submitting…' : config.submit}</button>
              {message && <p role="status" className={`mt-4 text-sm ${status === 'error' ? 'text-red-700' : 'text-emerald-800'}`}>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
