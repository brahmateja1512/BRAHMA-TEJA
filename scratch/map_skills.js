const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const categorize = (name) => {
  const n = name.toLowerCase()
  if (['c++', 'python', 'c', 'matlab', 'bash', 'javascript', 'typescript', 'rust', 'go', 'java', 'html', 'css'].includes(n)) return 'Programming Languages'
  
  if (['ros', 'ros1', 'ros2', 'ros 1', 'ros 2', 'opencv', 'pcl', 'eigen', 'pytorch', 'tensorflow', 'keras', 'cuda', 'react', 'next.js', 'nextjs', 'tailwind', 'numpy', 'scipy', 'pandas', 'scikit-learn', 'docker', 'tensorrt', 'openvino'].some(x => n.includes(x))) return 'Frameworks & Libraries'
  
  if (['solidworks', 'autocad', 'fusion360', 'fusion 360', 'catia', 'ansys', 'blender', 'cad', 'cam'].some(x => n.includes(x))) return 'CAD/CAM'
  
  if (['git', 'github', 'linux', 'ubuntu', 'jira', 'confluence', 'vscode', 'vim', 'cmake', 'make', 'gdb', 'valgrind'].some(x => n.includes(x))) return 'Tools & Software'
  
  if (['raspberry pi', 'arduino', 'jetson', 'nvidia jetson', 'stm32', 'esp32', 'lidar', 'camera', 'imu', 'sensors', 'actuators', 'motors', 'encoders', 'plc', 'pcb', 'soldering'].some(x => n.includes(x))) return 'Hardware & Boards'
  
  if (['slam', 'navigation', 'control', 'kinematics', 'dynamics', 'computer vision', 'machine learning', 'deep learning', 'reinforcement learning', 'path planning', 'sensor fusion', 'kalman filter', 'ai', 'robotics'].some(x => n.includes(x))) return 'Technologies'
  
  // Default fallbacks
  if (n.includes('js') || n.includes('react')) return 'Frameworks & Libraries'
  if (n.includes('db') || n.includes('sql') || n.includes('mongo')) return 'Tools & Software'

  return 'Technologies'
}

async function run() {
  const { data: skills, error } = await supabase.from('skills').select('*')
  if (error) {
    console.error('Error fetching skills:', error)
    return
  }

  for (const skill of skills) {
    const newCategory = categorize(skill.name)
    console.log(`Updating ${skill.name} -> ${newCategory}`)
    const { error: updateError } = await supabase.from('skills').update({ category: newCategory }).eq('id', skill.id)
    if (updateError) {
      console.error(`Error updating ${skill.name}:`, updateError)
    }
  }
  console.log('Done mapping skills!')
}

run()
