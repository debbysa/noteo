export interface Note {
  title: string
  content: string
  //   date: Date
  isDeleted: boolean
}

export type notesRequest = Omit<Note, 'isDeleted'>
