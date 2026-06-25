import { useStore } from "../store/useStore";

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  return (
    <div
      style={{
        background: "#F1C75B",
        color: "#000",
        borderRadius: "20px",
        padding: "20px",
        height: "373px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          margin: "0 0 16px 0",
        }}
      >
        All notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          background: "transparent",
          color: "#1d1d1d",
          fontSize: "18px",
          lineHeight: "1.7",
          fontFamily: "inherit",
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default NotesWidget;