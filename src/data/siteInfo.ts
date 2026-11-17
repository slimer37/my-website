// Edit this file to change the info shown in the site footer.

export type Contact = {
  label: string
  email: string
}

export const siteInfo = {
  author: "Alfred Roy M",

  contacts: [
    { label: "Primary", email: "alfredroym04@gmail.com" },
    { label: "Games/Support", email: "slimer37dev@gmail.com" },
  ] satisfies Contact[],

  hosting: {
    provider: "GitHub Pages",
    repoUrl: "https://github.com/slimer37/slimer37.github.io",
  },
}
