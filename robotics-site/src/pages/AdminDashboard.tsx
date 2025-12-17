import { useState } from 'react'
import { Calendar, Check, Clock, Users, ShieldCheck, Zap, XCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'
import { adminMembers, events, joinRequests } from '../data/content'

type TabKey = 'overview' | 'members' | 'requests' | 'events'

const stats = [
  { label: 'Active Members', value: '58', icon: Users },
  { label: 'Pending Requests', value: joinRequests.length.toString(), icon: Clock },
  { label: 'Upcoming Events', value: events.filter((e) => e.status === 'upcoming').length.toString(), icon: Calendar },
  { label: 'Projects Live', value: '12', icon: Zap },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [actionMessage, setActionMessage] = useState('')

  const handleRequestAction = (name: string, action: 'approved' | 'rejected') => {
    setActionMessage(`Request for ${name} ${action}. (Demo only, no backend yet.)`)
  }

  const tabButton = (key: TabKey, label: string) => (
    <button
      key={key}
      onClick={() => {
        setActiveTab(key)
        setActionMessage('')
      }}
      className={buttonClasses({
        variant: activeTab === key ? 'primary' : 'ghost',
        className: 'text-sm',
      })}
    >
      {label}
    </button>
  )

  return (
    <Section
      title="Admin Dashboard"
      eyebrow="Control center"
      description="Manage members, approve join requests, and oversee events. This demo is UI-only—wire to your backend as needed."
    >
      <div className="mb-6 flex flex-wrap gap-3">
        {tabButton('overview', 'Overview')}
        {tabButton('members', 'Members')}
        {tabButton('requests', 'Requests')}
        {tabButton('events', 'Events')}
      </div>

      {actionMessage && (
        <div className="mb-6 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-primary">
          {actionMessage}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-text-primary">
                      {item.value}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">Member pipeline</p>
                <p className="text-sm text-text-muted">
                  Track approvals, onboarding, and squad placement.
                </p>
              </div>
              <div className="inline-flex gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Approvals: {joinRequests.length}
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                  Active: 58
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'members' && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-5 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            <span>Name</span>
            <span>Role</span>
            <span>Squad</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <div>
            {adminMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-5 items-center gap-4 border-t border-slate-100 px-4 py-4 text-sm"
              >
                <div className="font-semibold text-text-primary">{member.name}</div>
                <div className="text-text-muted">{member.role}</div>
                <div className="text-text-muted">{member.squad}</div>
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    member.status === 'Active'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  {member.status}
                </span>
                <div className="flex justify-end gap-2">
                  <button
                    className={buttonClasses({ variant: 'ghost', className: 'text-xs px-3 py-2' })}
                    onClick={() =>
                      setActionMessage(`Updated permissions for ${member.name}. (Demo only)`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className={buttonClasses({ variant: 'ghost', className: 'text-xs px-3 py-2' })}
                    onClick={() =>
                      setActionMessage(`Member ${member.name} suspended. (Demo only)`)
                    }
                  >
                    Suspend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'requests' && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-6 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            <span>Name</span>
            <span>Email</span>
            <span>Interest</span>
            <span>Note</span>
            <span>Submitted</span>
            <span className="text-right">Actions</span>
          </div>
          <div>
            {joinRequests.map((request) => (
              <div
                key={request.id}
                className="grid grid-cols-6 items-center gap-4 border-t border-slate-100 px-4 py-4 text-sm"
              >
                <div className="font-semibold text-text-primary">{request.name}</div>
                <div className="text-text-muted">{request.email}</div>
                <div className="text-text-muted">{request.interest}</div>
                <div className="text-text-muted">{request.note}</div>
                <div className="text-text-muted">{request.submitted}</div>
                <div className="flex justify-end gap-2">
                  <button
                    className={buttonClasses({
                      variant: 'primary',
                      className: 'text-xs px-3 py-2',
                    })}
                    onClick={() => handleRequestAction(request.name, 'approved')}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Approve
                  </button>
                  <button
                    className={buttonClasses({
                      variant: 'ghost',
                      className: 'text-xs px-3 py-2',
                    })}
                    onClick={() => handleRequestAction(request.name, 'rejected')}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'events' && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-5 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Location</span>
            <span className="text-right">Actions</span>
          </div>
          <div>
            {events.map((event) => (
              <div
                key={event.id}
                className="grid grid-cols-5 items-center gap-4 border-t border-slate-100 px-4 py-4 text-sm"
              >
                <div className="font-semibold text-text-primary">{event.title}</div>
                <div className="text-text-muted">{event.date}</div>
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    event.status === 'upcoming'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-slate-200 text-text-primary'
                  }`}
                >
                  {event.status}
                </span>
                <div className="text-text-muted">{event.location}</div>
                <div className="flex justify-end gap-2">
                  <button
                    className={buttonClasses({ variant: 'ghost', className: 'text-xs px-3 py-2' })}
                    onClick={() =>
                      setActionMessage(`Updated event "${event.title}". (Demo only)`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className={buttonClasses({ variant: 'ghost', className: 'text-xs px-3 py-2' })}
                    onClick={() =>
                      setActionMessage(`Published updates for "${event.title}". (Demo only)`)
                    }
                  >
                    Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Section>
  )
}

