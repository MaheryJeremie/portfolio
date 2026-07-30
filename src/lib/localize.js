/** Pick FR/EN value from a Sanity locale object. */
export function pickLocale(value, lang) {
  if (value == null) return undefined
  if (typeof value !== 'object' || Array.isArray(value)) return value
  if ('fr' in value || 'en' in value) {
    const picked = value[lang] ?? value.fr ?? value.en
    return picked == null || picked === '' ? undefined : picked
  }
  return value
}

/** Recursively localize Sanity locale objects for a language. */
export function localize(value, lang) {
  if (value == null) return value
  if (Array.isArray(value)) return value.map((item) => localize(item, lang))
  if (typeof value !== 'object') return value

  if ('fr' in value || 'en' in value) {
    return pickLocale(value, lang)
  }

  const out = {}
  for (const [key, nested] of Object.entries(value)) {
    if (key.startsWith('_')) continue
    out[key] = localize(nested, lang)
  }
  return out
}

/** Deep-merge source onto target; undefined/null from source are skipped. */
export function deepMerge(target, source) {
  if (source == null) return target
  if (Array.isArray(source)) return source.length ? source : target
  if (typeof source !== 'object') return source
  if (typeof target !== 'object' || target == null || Array.isArray(target)) {
    return source
  }

  const out = {...target}
  for (const [key, value] of Object.entries(source)) {
    if (value == null) continue
    if (Array.isArray(value)) {
      if (value.length) out[key] = value
      continue
    }
    if (typeof value === 'object') {
      out[key] = deepMerge(target[key], value)
      continue
    }
    if (value !== '') out[key] = value
  }
  return out
}
