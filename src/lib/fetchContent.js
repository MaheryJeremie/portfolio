import {sanityClient} from './sanity'
import {localize, deepMerge} from './localize'

const SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]`

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  name, problem, result, tech, github, live, highlight, tag,
  imagePath, imageAlt, "imageUrl": image.asset->url
}`

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) {
  role, company, period, location, type, tech, bullets
}`

const EDUCATION_QUERY = `*[_type == "education"] | order(order asc) {
  degree, school, period, location, description
}`

const SKILLS_QUERY = `*[_type == "skillCategory"] | order(order asc) {
  key, label, items
}`

function projectImage(project) {
  return project.imageUrl || project.imagePath || undefined
}

function mapProject(project, lang) {
  const localized = localize(project, lang)
  return {
    name: localized.name,
    problem: localized.problem,
    result: localized.result,
    tech: localized.tech || [],
    github: localized.github || null,
    live: localized.live || null,
    highlight: Boolean(localized.highlight),
    tag: localized.tag,
    image: projectImage(project),
    imageAlt: localized.imageAlt,
  }
}

function mapExperience(job, lang) {
  const localized = localize(job, lang)
  return {
    role: localized.role,
    company: localized.company,
    period: localized.period,
    location: localized.location,
    type: localized.type,
    tech: localized.tech || [],
    bullets: (localized.bullets || []).filter(Boolean),
  }
}

function mapEducation(item, lang) {
  const localized = localize(item, lang)
  return {
    degree: localized.degree,
    school: localized.school,
    period: localized.period,
    location: localized.location,
    description: localized.description,
  }
}

function mapSkill(category, lang) {
  const localized = localize(category, lang)
  return {
    key: localized.key,
    label: localized.label,
    items: localized.items || [],
  }
}

function mapSettings(settings, lang) {
  if (!settings) return null
  const s = localize(settings, lang)

  return {
    lang,
    skipLink: s.skipLink,
    common: s.common,
    nav: s.nav,
    hero: s.hero,
    about: s.about
      ? {
          ...s.about,
          paragraphs: (s.about.paragraphs || []).filter(Boolean),
          interests: s.about.interests
            ? {
                title: s.about.interests.title,
                items: (s.about.interests.items || []).filter(Boolean),
              }
            : undefined,
          languages: s.about.languages
            ? {
                title: s.about.languages.title,
                items: (s.about.languages.items || []).map((item) => ({
                  lang: item.lang,
                  level: item.level,
                })),
              }
            : undefined,
        }
      : undefined,
    projects: s.projectsSection
      ? {
          title: s.projectsSection.title,
          subtitle: s.projectsSection.subtitle,
          featured: s.projectsSection.featured,
          problem: s.projectsSection.problem,
          result: s.projectsSection.result,
        }
      : undefined,
    skills: s.skillsSection
      ? {
          title: s.skillsSection.title,
          subtitle: s.skillsSection.subtitle,
        }
      : undefined,
    education: s.educationSection
      ? {
          title: s.educationSection.title,
          subtitle: s.educationSection.subtitle,
        }
      : undefined,
    experience: s.experienceSection
      ? {
          title: s.experienceSection.title,
          subtitle: s.experienceSection.subtitle,
        }
      : undefined,
    cta: s.cta,
    footer: s.footer,
  }
}

/**
 * Fetch Sanity content and shape it like fr.js / en.js.
 * Returns null if nothing usable was found (caller keeps local fallback).
 */
export async function fetchSanityContent(lang) {
  const [settings, projects, experiences, education, skills] = await Promise.all([
    sanityClient.fetch(SETTINGS_QUERY),
    sanityClient.fetch(PROJECTS_QUERY),
    sanityClient.fetch(EXPERIENCE_QUERY),
    sanityClient.fetch(EDUCATION_QUERY),
    sanityClient.fetch(SKILLS_QUERY),
  ])

  const fromSettings = mapSettings(settings, lang) || {}
  const content = {...fromSettings}

  if (projects?.length) {
    content.projects = {
      ...(content.projects || {}),
      items: projects.map((p) => mapProject(p, lang)),
    }
  }

  if (experiences?.length) {
    content.experience = {
      ...(content.experience || {}),
      jobs: experiences.map((j) => mapExperience(j, lang)),
    }
  }

  if (education?.length) {
    content.education = {
      ...(content.education || {}),
      items: education.map((e) => mapEducation(e, lang)),
    }
  }

  if (skills?.length) {
    content.skills = {
      ...(content.skills || {}),
      categories: skills.map((c) => mapSkill(c, lang)),
    }
  }

  const hasContent =
    settings ||
    projects?.length ||
    experiences?.length ||
    education?.length ||
    skills?.length

  return hasContent ? content : null
}

/** Merge Sanity overlay onto local translation (local stays as fallback). */
export function mergeContent(local, sanityOverlay) {
  if (!sanityOverlay) return local
  return deepMerge(local, sanityOverlay)
}
