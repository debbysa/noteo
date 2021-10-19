import HttpException from '../../utils/httpException'
import noteModel, { NotesDocument } from './note.model'
import { Note } from './note.type'

export default class NotesService {
  getNoteByTitle(title: string) {
    return noteModel.findOne({ title, isDeleted: false })
  }

  getAllNotes() {
    return new Promise<NotesDocument[]>(async (resolve, reject) => {
      try {
        const getNotes = noteModel.find({ isDeleted: false })
        if (getNotes) resolve(getNotes)
        else throw new HttpException(409, 'Note Not Found')
      } catch (error) {
        reject(error)
      }
    })
  }

  createNote(note: Note) {
    return new Promise(async (resolve, reject) => {
      try {
        const isNoteExist = await this.getNoteByTitle(note.title)
        if (isNoteExist) {
          throw new HttpException(409, 'Note title already exist')
        }

        resolve(noteModel.create({ ...note }))
      } catch (error) {
        reject(error)
      }
    })
  }

  editNote(id: string, note: Note) {
    return new Promise(async (resolve, reject) => {
      try {
        const editNote = await noteModel.findByIdAndUpdate(id, note, {
          new: true,
        })
        if (editNote) resolve(editNote)
        else throw new HttpException(400, 'note not found')
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteNote(id: string) {
    return new Promise<Pick<NotesDocument, '_id' | 'title'>>(async (resolve, reject) => {
      try {
        const deletedNote = await noteModel.findByIdAndUpdate(
          id,
          { isDeleted: true },
          { new: true, lean: true }
        )
        if (deletedNote) resolve(deletedNote)
        else throw new HttpException(400, 'note not found')
      } catch (error) {
        reject(error)
      }
    })
  }
}
