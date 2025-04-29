"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Trash, Tag, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Note {
  id: number
  title: string
  content: string
  date: string
  category: string
  tags: string[]
}

interface NotesAppProps {
  isDarkMode: boolean
}

export default function NotesApp({ isDarkMode }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [newTag, setNewTag] = useState("")

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (e) {
        console.error("Failed to parse saved notes")
      }
    } else {
      // Set default notes if none exist
      const defaultNotes: Note[] = [
        {
          id: 1,
          title: "Meeting Notes",
          content: "Discuss project timeline and deliverables with the team.",
          date: "Apr 15, 2023",
          category: "Work",
          tags: ["meeting", "project"],
        },
        {
          id: 2,
          title: "Shopping List",
          content: "Milk, eggs, bread, fruits, vegetables",
          date: "Apr 12, 2023",
          category: "Personal",
          tags: ["shopping", "groceries"],
        },
        {
          id: 3,
          title: "Ideas for Mobile Interface",
          content: "Add animations for transitions, implement dark mode, create app icons",
          date: "Apr 10, 2023",
          category: "Projects",
          tags: ["ideas", "mobile", "ui"],
        },
      ]
      setNotes(defaultNotes)
      localStorage.setItem("notes", JSON.stringify(defaultNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const filteredNotes = notes.filter(
    (note) =>
      (activeCategory === null || note.category === activeCategory) &&
      (activeTag === null || note.tags.includes(activeTag)) &&
      (searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const categories = Array.from(new Set(notes.map((note) => note.category)))
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: "",
      content: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "Personal",
      tags: [],
    }
    setCurrentNote(newNote)
    setIsEditing(true)
  }

  const editNote = (note: Note) => {
    setCurrentNote({ ...note })
    setIsEditing(true)
  }

  const saveNote = () => {
    if (!currentNote || !currentNote.title.trim()) return

    const updatedNotes = currentNote.id
      ? notes.map((note) => (note.id === currentNote.id ? currentNote : note))
      : [...notes, currentNote]

    setNotes(updatedNotes)
    setIsEditing(false)
    setCurrentNote(null)
  }

  const addTag = () => {
    if (!newTag.trim() || !currentNote) return
    if (!currentNote.tags.includes(newTag.trim())) {
      setCurrentNote({
        ...currentNote,
        tags: [...currentNote.tags, newTag.trim()],
      })
    }
    setNewTag("")
  }

  const removeTag = (tag: string) => {
    if (!currentNote) return
    setCurrentNote({
      ...currentNote,
      tags: currentNote.tags.filter((t) => t !== tag),
    })
  }

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {isEditing ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{currentNote?.id ? "Edit Note" : "New Note"}</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={currentNote?.title || ""}
              onChange={(e) => setCurrentNote({ ...currentNote!, title: e.target.value })}
              className={isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}
            />

            <Textarea
              placeholder="Note content..."
              value={currentNote?.content || ""}
              onChange={(e) => setCurrentNote({ ...currentNote!, content: e.target.value })}
              className={`min-h-[200px] ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={currentNote?.category || "Personal"}
                onChange={(e) => setCurrentNote({ ...currentNote!, category: e.target.value })}
                className={`w-full p-2 rounded-md ${
                  isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="New">+ New Category</option>
              </select>
            </div>

            {currentNote?.category === "New" && (
              <Input
                placeholder="New category name"
                onChange={(e) => setCurrentNote({ ...currentNote!, category: e.target.value })}
                className={isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}
              />
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentNote?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex">
                <Input
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className={`flex-1 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                />
                <Button variant="outline" onClick={addTag} className="ml-2">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button onClick={saveNote} className="w-full">
              <Save className="w-4 h-4 mr-2" /> Save Note
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Search and add */}
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search notes"
                className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              size="icon"
              className={`ml-2 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
              variant="ghost"
              onClick={createNewNote}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
            <Badge
              variant={activeCategory === null ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setActiveCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
              <Badge
                variant={activeTag === null ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveTag(null)}
              >
                All Tags
              </Badge>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Notes list */}
          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No notes found</div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
                  onClick={() => editNote(note)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{note.title}</h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                    >
                      <Trash className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span>{note.date}</span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        note.category === "Work"
                          ? "bg-blue-100 text-blue-800"
                          : note.category === "Personal"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {note.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
