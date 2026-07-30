import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Contenu du site')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('project').title('Projets'),
      S.documentTypeListItem('experience').title('Expériences'),
      S.documentTypeListItem('education').title('Formations'),
      S.documentTypeListItem('skillCategory').title('Compétences'),
    ])
