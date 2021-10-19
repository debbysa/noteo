import { Document, model, Schema } from 'mongoose'
import { Note } from './note.type'

export type NotesDocument = Omit<Note, 'isDeleted'> & Document

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // date: {
    //     type: Date
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default model<NotesDocument>('Product', notesSchema)
