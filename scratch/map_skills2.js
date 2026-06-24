const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const exactMap = {
  'Gazebo': 'Tools & Software',
  'Additive Manufacturing': 'Hardware & Boards',
  'Drones': 'Hardware & Boards',
  'Latex': 'Tools & Software',
  '3D Printing': 'Hardware & Boards',
  'Ms Office': 'Tools & Software',
  'Web Development': 'Frameworks & Libraries',
  'Canva': 'Tools & Software',
  'Embedded C': 'Programming Languages',
  'C ': 'Programming Languages',
  'C': 'Programming Languages',
  'C++': 'Programming Languages',
  'English ': 'Technologies',
  'STEM': 'Technologies'
}

async function run() {
  const { data: skills, error } = await supabase.from('skills').select('*')
  if (error) return console.error('Error fetching skills:', error)

  for (const skill of skills) {
    if (exactMap[skill.name] || exactMap[skill.name.trim()]) {
      const newCategory = exactMap[skill.name] || exactMap[skill.name.trim()]
      console.log(`Updating ${skill.name} -> ${newCategory}`)
      await supabase.from('skills').update({ category: newCategory }).eq('id', skill.id)
    }
  }
  console.log('Second pass done!')
}

run()
