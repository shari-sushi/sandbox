export type newMember = {
  index: string
  name: string
  age: number | undefined
}

export type FormValues = {
  teamName: string
  members: newMember[]
}
