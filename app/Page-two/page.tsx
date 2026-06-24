'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import './signup-step1.css'
import { NeumorphicCalendar } from './NeumorphicCalendar'
import './NeumorphicCalendar.css'

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect
      x="2.5"
      y="3.5"
      width="15"
      height="14"
      rx="2"
      stroke="rgba(49,52,75,0.6)"
      strokeWidth="1.25"
    />
    <path d="M2.5 7.5H17.5" stroke="rgba(49,52,75,0.6)" strokeWidth="1.25" />
    <path d="M7 1.5V3.5" stroke="rgba(49,52,75,0.6)" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M13 1.5V3.5" stroke="rgba(49,52,75,0.6)" strokeWidth="1.25" strokeLinecap="round" />
    <rect x="6" y="10" width="2.5" height="2.5" rx="0.5" fill="rgba(49,52,75,0.6)" />
  </svg>
)

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="6.5" r="3.25" stroke="rgba(49,52,75,0.6)" strokeWidth="1.25" />
    <path
      d="M3.5 17C3.5 13.9624 6.46243 11.5 10 11.5C13.5376 11.5 16.5 13.9624 16.5 17"
      stroke="rgba(49,52,75,0.6)"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.33432 6.66797H9.16765C10.0882 6.66797 10.8343 7.41416 10.8343 8.33464M10.8343 8.33464V9.16797M10.8343 8.33464C10.8343 7.8744 11.2074 7.5013 11.6677 7.5013C12.5882 7.5013 13.3343 8.24749 13.3343 9.16797M13.3343 9.16797V10.0013M13.3343 9.16797C13.3343 8.73172 13.7261 8.39989 14.1563 8.47164L14.4417 8.51922C15.2453 8.65314 15.8343 9.34847 15.8343 10.1632L15.834 11.3903C15.834 13.2015 15.834 14.1071 15.5581 14.828C15.3981 15.2462 14.9759 15.7796 14.6383 16.165C14.3463 16.4983 14.1673 16.9211 14.1673 17.3643V18.3348M8.33415 8.33464V2.91797C8.33415 2.22761 7.77452 1.66797 7.08416 1.66797C6.3938 1.66797 5.83416 2.22761 5.83416 2.91797L5.83399 11.22L4.48374 9.86547C3.89129 9.27122 2.91542 9.32539 2.39203 9.98172C1.99154 10.4839 1.98049 11.1942 2.36514 11.7087L5.36488 15.5406C5.93881 16.2737 6.25065 17.4037 6.25065 18.3348"
      stroke="#2D4CC8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.916 3.7513H12.916M17.916 3.7513C17.916 3.16778 16.2541 2.07758 15.8327 1.66797M17.916 3.7513C17.916 4.33483 16.2541 5.42503 15.8327 5.83464"
      stroke="#2D4CC8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function SuperAdminSignUpStep1() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [showCal, setShowCal] = useState(false)
  const [errors, setErrors] = useState<{ fullName?: string; dob?: string }>({})
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)

  const validate = () => {
    const newErrors: { fullName?: string; dob?: string } = {}
    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!dob) newErrors.dob = 'Date of birth is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      router.push('/superadmin/auth/signup/step-2')
    }
  }

  return (
    <div className="s1-root">
      <div className="s1-layout">
        <div className="s1-left">
          <Image
            src="/images/logo_01_synapse_spark.png"
            alt="NeuroLXP"
            width={192}
            height={77}
            priority
            className="s1-logo"
          />
          <div className="s1-title-block">
            <h1 className="s1-title">Super Admin Portal</h1>
            <p className="s1-subtitle">Secure super administrator registration</p>
          </div>
          <div className="s1-circle-outer">
            <div className="s1-circle-inner">
              <Image
                src="/images/second.avif"
                alt="Admin illustration"
                fill
                className="s1-circle-img"
                sizes="(max-width: 768px) 0px, (max-width: 1024px) 188px, (max-width: 1439px) 242px, 286px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="s1-right">
          <div className="s1-card">
            <div className="s1-panel">
              <div className="s5-progress-section">
                <div className="s5-progress-header">
                  <span className="s5-progress-label">REGISTRATION PROGRESS</span>
                  <span className="s5-progress-step">
                    Step <strong>4</strong> of 12
                  </span>
                </div>
                <div className="s5-stepper-track">
                  <div className="s5-stepper-inner">
                    <div className="s5-dot">
                      <div className="s5-dot-outer">
                        <div className="s5-dot-inner s5-dot-inner--done">
                          <span className="s5-dot-num s5-dot-num--done">1</span>
                        </div>
                      </div>
                    </div>
                    <div className="s5-track-line">
                      <div className="s5-track-bg" />
                      <div className="s5-track-fill" />
                    </div>
                    <div className="s5-dot s5-dot-mid">
                      <div className="s5-dot-outer">
                        <div className="s5-dot-inner s5-dot-inner--active">
                          <span className="s5-dot-num s5-dot-num--active">7</span>
                        </div>
                      </div>
                      <span className="s5-dot-label">Recovery Code</span>
                    </div>
                    <div className="s5-track-line s5-track-line--right">
                      <div className="s5-track-bg" />
                    </div>
                    <div className="s5-dot">
                      <div className="s5-dot-outer">
                        <div className="s5-dot-inner s5-dot-inner--pending">
                          <span className="s5-dot-num s5-dot-num--pending">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="s1-form-card">
                <div className="s1-section-head">
                  <h2 className="s1-section-title">Basic Information</h2>
                  <p className="s1-section-sub">Enter your legal name and date</p>
                </div>

                <div className="s1-field">
                  <label className="s1-label">FULL NAME</label>
                  <div className={`s1-input-row ${errors.fullName ? 's1-input-row--err' : ''}`}>
                    <div className="s1-icon-bubble">
                      <UserIcon />
                    </div>
                    <input
                      type="text"
                      className="s1-input"
                      placeholder="As per legal Document"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value)
                        if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }))
                      }}
                    />
                  </div>
                  {errors.fullName && <span className="s1-err">{errors.fullName}</span>}
                </div>

                <div className="s1-field">
                  <label className="s1-label">DATE OF BIRTH</label>
                  <div
                    className={`s1-input-row ${errors.dob ? 's1-input-row--err' : ''}`}
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onClick={(e) => {
                      setAnchorRect((e.currentTarget as HTMLElement).getBoundingClientRect())
                      setShowCal(true)
                    }}
                  >
                    <div className="s1-icon-bubble">
                      <CalendarIcon />
                    </div>
                    <span
                      className="s1-input"
                      style={{
                        cursor: 'pointer',
                        color: dob ? 'rgba(49,52,75,0.85)' : 'rgba(49,52,75,0.4)',
                      }}
                    >
                      {dob
                        ? new Date(dob).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Select Date'}
                    </span>
                    {showCal && (
                      <NeumorphicCalendar
                        value={dob}
                        anchorRect={anchorRect ?? undefined}
                        onChange={(d) => {
                          setDob(d)
                          if (errors.dob) setErrors((p) => ({ ...p, dob: undefined }))
                        }}
                        onClose={() => setShowCal(false)}
                      />
                    )}
                  </div>
                  {errors.dob && <span className="s1-err">{errors.dob}</span>}
                  <span className="s1-hint">Must match your Government Id</span>
                </div>

                <div className="s1-footer">
                  <button className="s1-btn" onClick={handleContinue}>
                    <span>Save &amp; Continue</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>

            <p className="s1-signin-text">
              Already have an account?{' '}
              <a href="/superadmin/auth/sign-in" className="s1-signin-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
