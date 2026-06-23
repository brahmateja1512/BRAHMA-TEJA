export default function CVPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-10 pb-10 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-end">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Curriculum Vitae</h1>
        <a 
          href="/cv.pdf" 
          download 
          className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
        >
          Download PDF
        </a>
      </div>
      
      <div className="w-full max-w-5xl flex-1 bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 relative shadow-2xl min-h-[80vh]">
        <iframe 
          src="/cv.pdf" 
          className="absolute inset-0 w-full h-full border-0"
          title="Curriculum Vitae"
        />
      </div>
    </div>
  )
}
