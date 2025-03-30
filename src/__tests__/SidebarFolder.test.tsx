import { render, screen, fireEvent } from "@testing-library/react";
import SidebarFolder from "@/components/sidebar/SidebarFolder";

describe("SidebarFolder Component", () => {
  const mockSetSelectedFolder = jest.fn();
  const mockAddFolder = jest.fn();
  const mockRemoveFolder = jest.fn();

  const sampleFolders = [
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
  ];

  it("renders folders correctly", () => {
    render(
      <SidebarFolder
        folders={sampleFolders}
        selectedFolder={null}
        setSelectedFolder={mockSetSelectedFolder}
        addFolder={mockAddFolder}
        removeFolder={mockRemoveFolder}
      />
    );

    expect(screen.getByText("📁 Folders")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("adds a new folder", () => {
    render(
      <SidebarFolder
        folders={sampleFolders}
        selectedFolder={null}
        setSelectedFolder={mockSetSelectedFolder}
        addFolder={mockAddFolder}
        removeFolder={mockRemoveFolder}
      />
    );

    const input = screen.getByPlaceholderText("New folder name");
    fireEvent.change(input, { target: { value: "New Folder" } });

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockAddFolder).toHaveBeenCalledWith("New Folder");
  });

  it("removes a folder", () => {
    render(
      <SidebarFolder
        folders={sampleFolders}
        selectedFolder={null}
        setSelectedFolder={mockSetSelectedFolder}
        addFolder={mockAddFolder}
        removeFolder={mockRemoveFolder}
      />
    );

    const removeButton = screen.getAllByText("✕")[0]; // First remove button
    fireEvent.click(removeButton);

    expect(mockRemoveFolder).toHaveBeenCalledWith("1");
  });

  it("selects a folder", () => {
    render(
      <SidebarFolder
        folders={sampleFolders}
        selectedFolder={null}
        setSelectedFolder={mockSetSelectedFolder}
        addFolder={mockAddFolder}
        removeFolder={mockRemoveFolder}
      />
    );

    const folderButton = screen.getByText("Work");
    fireEvent.click(folderButton);

    expect(mockSetSelectedFolder).toHaveBeenCalledWith("1");
  });
});
