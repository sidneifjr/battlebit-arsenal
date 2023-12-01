export const replaceWhiteSpaceWithDash = (value: string) => {
  if (value !== undefined) {
    return value.replace(/\s/g, '-')
  }
}
