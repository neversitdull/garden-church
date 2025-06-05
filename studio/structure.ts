import {CogIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for Navigation
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .icon(CogIcon)
        .child(
          S.document().schemaType('navigation').documentId('navigation').title('Site Navigation'),
        ),
      // Divider
      S.divider(),
      // All other document types (filtered to exclude navigation)
      ...S.documentTypeListItems().filter(
        (listItem) => !['navigation'].includes(listItem.getId()!),
      ),
    ])
