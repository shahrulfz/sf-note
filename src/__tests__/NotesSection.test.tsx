import { render, screen, fireEvent } from "@testing-library/react";
import NotesSection from "@/components/section/NotesSection";

// Create mock functions
const mockSetSelectedNoteId = jest.fn();
const mockDeleteNote = jest.fn();

// Properly mock Zustand stores
jest.mock("@/stores/notes/useNoteListStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    notesList: [
      {
        id: "1",
        title: "Note 1",
        note: "This is a test note.",
        folderId: "folder-1",
        noteStyles: {
          fontSize: 16,
          color: "#000000",
          isBold: false,
          isItalic: false,
        },
      },
      {
        id: "2",
        title: "Note 2",
        note: "Another note.",
        folderId: "folder-2",
        noteStyles: {
          fontSize: 14,
          color: "#333333",
          isBold: true,
          isItalic: false,
        },
      },
    ],
    deleteNote: mockDeleteNote,
  })),
}));

jest.mock("@/stores/folders/useFolderStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    selectedFolder: "folder-1",
    folders: [
      { id: "folder-1", name: "Work" },
      { id: "folder-2", name: "Personal" },
    ],
  })),
}));

jest.mock("@/stores/notes/useUpdateNoteStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setSelectedNoteId: mockSetSelectedNoteId,
  })),
}));

describe("NotesSection Component", () => {
  const mockOpenSelectedModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Ensure no mock interference between tests
  });

  it("renders the correct folder name", () => {
    render(<NotesSection openSelectedModal={mockOpenSelectedModal} />);
    expect(screen.getByText("Work")).toBeInTheDocument();
  });

  it("renders the correct notes for the selected folder", () => {
    render(<NotesSection openSelectedModal={mockOpenSelectedModal} />);
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.queryByText("Note 2")).not.toBeInTheDocument(); // Should be filtered out
  });

  it("opens the modal when a note is clicked", () => {
    render(<NotesSection openSelectedModal={mockOpenSelectedModal} />);

    const noteCard = screen.getByText("Note 1");
    fireEvent.click(noteCard);

    expect(mockSetSelectedNoteId).toHaveBeenCalledWith("1");
    expect(mockOpenSelectedModal).toHaveBeenCalled();
  });

  it("deletes a note when the delete button is clicked", () => {
    render(<NotesSection openSelectedModal={mockOpenSelectedModal} />);

    // Find the delete button inside the first note card
    const firstNoteCard = screen.getByText("Note 1").closest("div"); // Get the container div
    const deleteButton = firstNoteCard?.querySelector("button"); // Find the button inside

    expect(deleteButton).toBeInTheDocument(); // Ensure the button exists

    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockDeleteNote).toHaveBeenCalledWith("1"); // Ensure correct note is deleted
    }
  });
});
