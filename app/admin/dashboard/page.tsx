import { supabase } from '@/lib/supabase'
import { LogOut } from 'lucide-react'

export const revalidate = 0 // Never cache the admin dashboard

export default async function AdminDashboard() {
  const { data: realEnquiries, error: enqError } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  const { data: realProjects, error: projError } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  
  // Use mock data if database connection fails (Demo Mode)
  const isDemo = enqError && (enqError.message?.includes('fetch failed') || String(enqError).includes('ENOTFOUND'))
  
  const enquiries = !isDemo && realEnquiries ? realEnquiries : [
    { id: 'demo1', name: 'Test Enquiry', email: 'test@example.com', message: 'Hello! I am a simulated enquiry because the real Supabase database has not been connected yet. Once you connect the database, real messages will appear here!', created_at: new Date().toISOString() }
  ]

  const projects = !isDemo && realProjects ? realProjects : [
    { id: '1', title: 'Autonomous Navigation Stack', technical_details: 'ROS2, MediaPipe', created_at: new Date().toISOString() },
    { id: '2', title: 'Smart Radar System for Security', technical_details: 'Motion Detection, Alert Forecasting', created_at: new Date().toISOString() }
  ]
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold">Admin CMS</h1>
          <form action="/api/auth/logout" method="POST">
            <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </form>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">Recent Enquiries</h2>
          <div className="grid gap-4">
            {enquiries && enquiries.length > 0 ? enquiries.map((enq) => (
              <div key={enq.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{enq.name}</h3>
                    <p className="text-sm text-white/50">{enq.email}</p>
                  </div>
                  <span className="text-xs text-white/30">{new Date(enq.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-white/80 whitespace-pre-wrap text-sm">{enq.message}</p>
              </div>
            )) : (
              <p className="text-white/40 italic">No enquiries found in database.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-green-500 pl-4">Projects Directory</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/60">
                <tr>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Tech</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {projects && projects.length > 0 ? projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{proj.title}</td>
                    <td className="p-4 text-white/50">{proj.technical_details}</td>
                    <td className="p-4 text-white/50">{new Date(proj.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/40 italic">No projects found. Add them to Supabase.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        
      </div>
    </div>
  )
}
