export const ADD_MODAL = {
  TITLE: 'Add new article',
  NAME_LABEL: 'Name',
  NAME_PLACEHOLDER: 'Article name...',
  AUTHOR_LABEL: 'Author',
  AUTHOR_PLACEHOLDER: 'Article author...',
  DESCRIPTION_LABEL: 'description',
  DESCRIPTION_PLACEHOLDER: 'Article description...',
  CONTENT_PLACEHOLDER: 'Article content...',
  FIELD: {
    TITLE: 'title' as const,
    DESCRIPTION: 'description' as const,
    AUTHOR: 'author' as const,
    CONTENT: 'content' as const,
    IMAGE: 'image' as const
  }
};
