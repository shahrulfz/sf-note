import { render, screen, fireEvent } from "@testing-library/react";
import SFNoteEditorParent from "@/components/SFNoteEditorParent";

const mockSetTitle = jest.fn();
const mockSetNote = jest.fn();
const mockSetNoteStyles = jest.fn();
const mockSetFolderId = jest.fn();
const mockSetIsClick = jest.fn();
const mockHandleSave = jest.fn();
const mockReset = jest.fn();

const foldersMock = [
  { id: "folder-1", name: "Work" },
  { id: "folder-2", name: "Personal" },
];

describe("SFNoteEditorParent Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with initial values", () => {
    render(
      <SFNoteEditorParent
        folders={foldersMock}
        className="test-class"
        title="Sample Title"
        note="Sample Note"
        noteStyles={{ fontSize: 16, color: "#000000" }}
        folderId="folder-1"
        setTitle={mockSetTitle}
        setNote={mockSetNote}
        setNoteStyles={mockSetNoteStyles}
        setFolderId={mockSetFolderId}
        isClick={true}
        setIsClick={mockSetIsClick}
        handleSave={mockHandleSave}
        reset={mockReset}
      />
    );
    expect(screen.getByPlaceholderText("Title")).toHaveValue("Sample Title");
    expect(screen.getByPlaceholderText("Write a note")).toHaveValue(
      "Sample Note"
    );
  });

  it("updates the title when changed", () => {
    render(
      <SFNoteEditorParent
        folders={foldersMock}
        className="test-class"
        title="Sample Title"
        note="Sample Note"
        noteStyles={{ fontSize: 16, color: "#000000" }}
        folderId="folder-1"
        setTitle={mockSetTitle}
        setNote={mockSetNote}
        setNoteStyles={mockSetNoteStyles}
        setFolderId={mockSetFolderId}
        isClick={true}
        setIsClick={mockSetIsClick}
        handleSave={mockHandleSave}
        reset={mockReset}
      />
    );

    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(mockSetTitle).toHaveBeenCalledWith("Updated Title");
  });

  it("calls setIsClick when the container is clicked", () => {
    render(
      <SFNoteEditorParent
        folders={foldersMock}
        className="test-class"
        title=""
        note=""
        noteStyles={{ fontSize: 16, color: "#000000" }}
        folderId="folder-1"
        setTitle={mockSetTitle}
        setNote={mockSetNote}
        setNoteStyles={mockSetNoteStyles}
        setFolderId={mockSetFolderId}
        isClick={false}
        setIsClick={mockSetIsClick}
        handleSave={mockHandleSave}
        reset={mockReset}
      />
    );
    const container = screen.getByRole("textbox");
    fireEvent.click(container);
    expect(mockSetIsClick).toHaveBeenCalledWith(true);
  });

  it("clears the editor when close button is clicked", () => {
    render(
      <SFNoteEditorParent
        folders={foldersMock}
        title="Sample Title"
        note="Sample Note"
        noteStyles={{ fontSize: 16, color: "#000000" }}
        folderId="folder-1"
        setTitle={mockSetTitle}
        setNote={mockSetNote}
        setNoteStyles={mockSetNoteStyles}
        setFolderId={mockSetFolderId}
        isClick={true}
        setIsClick={mockSetIsClick}
        handleSave={mockHandleSave}
        reset={mockReset}
      />
    );
    const closeButton = screen.getByLabelText("Close title input");
    fireEvent.click(closeButton);

    expect(mockSetIsClick).toHaveBeenCalledWith(false);
    expect(mockReset).toHaveBeenCalled();
  });
});
