import { render, screen, fireEvent } from "@testing-library/react";
import MyTextEditor from "@/components/MyTextEditor";
import { Folder } from "@/types/folderTypes";
import { NoteStyles } from "@/types/notes/noteTypes";

describe("MyTextEditor Component", () => {
  const mockOnChange = jest.fn();
  const mockSetNoteStyles = jest.fn();
  const mockSetFolderId = jest.fn();
  const mockHandleSave = jest.fn();

  const defaultNoteStyles: NoteStyles = {
    fontSize: 16,
    color: "#000000",
    isBold: false,
    isItalic: false,
  };

  const folders: Folder[] = [
    { id: "folder-1", name: "Work" },
    { id: "folder-2", name: "Personal" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and allows text input", () => {
    render(
      <MyTextEditor
        isClick={true}
        value="Test note"
        onChange={mockOnChange}
        noteStyles={defaultNoteStyles}
        setNoteStyles={mockSetNoteStyles}
        folders={folders}
        folderId="folder-1"
        setFolderId={mockSetFolderId}
        handleSave={mockHandleSave}
      />
    );

    const textarea = screen.getByPlaceholderText("Write a note");
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "Updated note" } });
    expect(mockOnChange).toHaveBeenCalledWith("Updated note");
  });

  it("applies bold and italic styles correctly", () => {
    render(
      <MyTextEditor
        isClick={true}
        value="Test note"
        onChange={mockOnChange}
        noteStyles={defaultNoteStyles}
        setNoteStyles={mockSetNoteStyles}
        folders={folders}
        folderId="folder-1"
        setFolderId={mockSetFolderId}
        handleSave={mockHandleSave}
      />
    );

    const boldButton = screen.getByText("B");
    fireEvent.click(boldButton);
    expect(mockSetNoteStyles).toHaveBeenCalledWith({ isBold: true });

    const italicButton = screen.getByText("I");
    fireEvent.click(italicButton);
    expect(mockSetNoteStyles).toHaveBeenCalledWith({ isItalic: true });
  });

  it("changes the folder when selected", () => {
    render(
      <MyTextEditor
        isClick={true}
        value="Test note"
        onChange={mockOnChange}
        noteStyles={defaultNoteStyles}
        setNoteStyles={mockSetNoteStyles}
        folders={folders}
        folderId="folder-1"
        setFolderId={mockSetFolderId}
        handleSave={mockHandleSave}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "folder-2" } });
    expect(mockSetFolderId).toHaveBeenCalledWith("folder-2");
  });

  it("calls handleSave when the save button is clicked", () => {
    render(
      <MyTextEditor
        isClick={true}
        value="Test note"
        onChange={mockOnChange}
        noteStyles={defaultNoteStyles}
        setNoteStyles={mockSetNoteStyles}
        folders={folders}
        folderId="folder-1"
        setFolderId={mockSetFolderId}
        handleSave={mockHandleSave}
      />
    );

    const saveButton = screen.getByText("Save Note");
    fireEvent.click(saveButton);
    expect(mockHandleSave).toHaveBeenCalled();
  });
});
