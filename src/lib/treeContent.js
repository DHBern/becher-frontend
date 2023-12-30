/**
 * A tree node.
 * @typedef {Object} TreeNode
 * @property {number} id
 * @property {string} content
 * @property {string} value
 * @property {TreeNode[]} [children]
 */
export const nodes = [
  {
    id: '0',
    content: 'Werke',
    value: 'Werke',
    children: [
      {
        id: '00',
        content: 'Erzählungen',
        value: 'Erzählungen',
      },
      {
        id: '01',
        content: 'Romane',
        value: 'Romane',
      },
      {
        id: '02',
        content: 'Gedichte und Versepen',
        value: 'Gedichte und Versepen',
      },
      {
        id: '03',
        content: 'Dramen',
        value: 'Dramen',
      },
    ],
  },
  {
    id: '1',
    content: 'Briefe',
    value: 'Briefe',
  },
  {
    id: '2',
    content: 'Lebensdokumente',
    value: 'Lebensdokumente',
    children: [
      {
        id: '20',
        content: 'Persönliche Dokumente',
        value: 'Persönliche Dokumente',
      },
      {
        id: '21',
        content: 'Berufliche Dokumente',
        value: 'Berufliche Dokumente',
        children: [
          {
            id: '210',
            content: 'Persönliche Dokumente',
            value: 'Persönliche Dokumente',
          },
          {
            id: '211',
            content: 'Berufliche Dokumente',
            value: 'Berufliche Dokumente',
          },
          {
            id: '212',
            content: 'Familie',
            value: 'Familie',
          },
        ],
      },
      {
        id: '22',
        content: 'Familie',
        value: 'Familie',
      },
    ],
  },
];