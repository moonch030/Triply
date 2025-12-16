type KeyDownParams = {
    e: React.KeyboardEvent<HTMLInputElement>;
    suggestions: google.maps.places.AutocompletePrediction[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    handleSelectSuggestion: (placeId: string, description?: string) => void;
    handleSearch: () => void;
}

export const handleTravelInputKeyDown = ({
    e,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    handleSelectSuggestion,
    handleSearch,
}: KeyDownParams) => {
    if (e.key === "ArrowDown" && suggestions.length) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === "ArrowUp" && suggestions.length) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0) {
            const s = suggestions[selectedIndex];
            handleSelectSuggestion(s.place_id, s.description);
        } else {
            handleSearch();
        }
    }
};

//  이벤트
export const handleDragStart = (e: React.DragEvent, index: number, setDraggedIndex: (i: number) => void) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
};

export const handleDrop = (e: React.DragEvent, index: number, draggedIndex: number, reorder: (from: number, to: number) => void) => {
    e.preventDefault();
    reorder(draggedIndex, index);
};

export const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
};
