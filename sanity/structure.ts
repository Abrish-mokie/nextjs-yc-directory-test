import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('startup').title('Startup'),
      S.documentTypeListItem('author').title('Author'),
      S.documentTypeListItem('playlist').title('Playlist'),
    ]);
