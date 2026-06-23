'use client'

import { FileText, Download, Trash2, Upload } from 'lucide-react'

export default function ResumeManager() {
  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Resume Manager</h2>
        <p className="text-gray-500 mt-1 text-sm font-medium">Upload and manage your CV/Resume files</p>
      </div>

      <div className="bg-[#FDFBF7] dark:bg-[#050505] border border-black/5 dark:border-white/5 rounded-2xl p-6 mb-8 shadow-inner">
        <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">Upload New Resume</h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Version (e.g., 2.0, Jan 2026)" 
            className="flex-1 px-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]"
          />
          <button className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
            <Upload size={18} /> Upload PDF
          </button>
        </div>
        <p className="text-xs text-gray-500 font-medium mt-3 uppercase tracking-widest">Only PDF files up to 10MB are supported</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">Uploaded Resumes</h3>
        
        <div className="border border-black/5 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between bg-white dark:bg-[#111]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-200 dark:border-red-500/20">
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-[#1A1B41] dark:text-[#FDFBF7] text-sm">BRAHMA-TEJA-JAMPU-RESUME.pdf</h4>
                <span className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Current
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 mt-1 flex gap-4 uppercase tracking-wider">
                <span>Version: 2.1</span>
                <span>210.1 KB</span>
                <span>Mar 9, 2026</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <Download size={16} /> Download
            </button>
            <button className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6 text-sm">
        <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-3 text-lg">How it works</h4>
        <ul className="text-blue-700 dark:text-blue-300 font-medium space-y-2 list-none">
          <li>• Upload your resume PDF with a version number</li>
          <li>• Set one resume as "Current" - this is what visitors will download</li>
          <li>• The CV/Resume button on your site will automatically download the current version</li>
          <li>• Keep old versions for reference or to quickly switch back</li>
        </ul>
      </div>
    </div>
  )
}
