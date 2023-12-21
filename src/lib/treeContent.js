/**
 * A tree node.
 * @typedef {Object} TreeNode
 * @property {string} id
 * @property {string} content
 * @property {string} value
 * @property {TreeNode[]} [children]
 */
export const nodes = [
  {
    id: 'Werke',
    content: 'Werke',
    value: 'Werke',
    children: [
      {
        id: 'Erzählungen',
        content: 'Erzählungen',
        value: 'Erzählungen',
      },
      {
        id: 'Romane',
        content: 'Romane',
        value: 'Romane',
      },
      {
        id: 'Gedichte und Versepen',
        content: 'Gedichte und Versepen',
        value: 'Gedichte und Versepen',
      },
      {
        id: 'Dramen',
        content: 'Dramen',
        value: 'Dramen',
      },
    ],
  },
  {
    id: 'Briefe',
    content: 'Briefe',
    value: 'Briefe',
  },
  {
    id: 'Lebensdokumente',
    content: 'Lebensdokumente',
    value: 'Lebensdokumente',
    children: [
      {
        id: 'Persönliche Dokumente',
        content: 'Persönliche Dokumente',
        value: 'Persönliche Dokumente',
      },
      {
        id: 'Berufliche Dokumente',
        content: 'Berufliche Dokumente',
        value: 'Berufliche Dokumente',
        children: [
          {
            id: 'Persönliche Dokumente',
            content: 'Persönliche Dokumente',
            value: 'Persönliche Dokumente',
          },
          {
            id: 'Berufliche Dokumente',
            content: 'Berufliche Dokumente',
            value: 'Berufliche Dokumente',
          },
          {
            id: 'Familie',
            content: 'Familie',
            value: 'Familie',
          },
        ],
      },
      {
        id: 'Familie',
        content: 'Familie',
        value: 'Familie',
      },
    ],
  },
];