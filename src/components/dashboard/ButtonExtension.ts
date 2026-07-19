import { mergeAttributes, Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    buttonExtension: {
      insertButton: (options: { href: string; text: string }) => ReturnType;
    };
  }
}

export const ButtonExtension = Node.create({
  name: 'buttonExtension',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      href: { default: null },
      text: { default: 'Button' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-custom-button="true"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        'data-custom-button': 'true',
        class: 'inline-flex items-center justify-center px-6 py-3 rounded-lg bg-stone-900 !text-white font-semibold text-sm hover:bg-stone-800 transition-colors cursor-pointer no-underline !my-4',
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
      HTMLAttributes.text,
    ];
  },

  addCommands() {
    return {
      insertButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
