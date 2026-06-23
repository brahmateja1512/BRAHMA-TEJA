'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveProject(formData: FormData, id?: string) {
  const payload = {
    title: formData.get('title') as string,
    type: formData.get('org') as string, // stored as 'type' in db, but org in form
    slug: formData.get('slug') as string,
    short_description: formData.get('shortDescription') as string,
    detailed_content: formData.get('detailedContent') as string,
    github_url: formData.get('githubUrl') as string,
    demo_url: formData.get('demoUrl') as string,
    images: (formData.get('images') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
    tags: [] // Can add tag parsing later
  }

  let error;
  if (id) {
    const res = await supabase.from('projects').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('projects').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/admin/portfolio')
  return { success: true }
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/admin/portfolio')
  return { success: true }
}

export async function savePublication(formData: FormData, id?: string) {
  const payload = {
    title: formData.get('title') as string,
    publisher: formData.get('org') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('shortDescription') as string,
    abstract: formData.get('detailedContent') as string,
    doi_url: formData.get('doiUrl') as string,
    pdf_url: formData.get('pdfUrl') as string,
    authors: formData.get('authors') as string,
    published_date: formData.get('publishedDate') as string,
    type: 'Journal'
  }

  let error;
  if (id) {
    const res = await supabase.from('publications').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('publications').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  
  revalidatePath('/')
  revalidatePath('/publications')
  revalidatePath('/admin/portfolio')
  return { success: true }
}

export async function deletePublication(id: string) {
  const { error } = await supabase.from('publications').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/publications')
  revalidatePath('/admin/portfolio')
  return { success: true }
}
