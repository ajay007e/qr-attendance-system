export default function Footer() {
  return (
    <footer
      className="
border-t
bg-white
px-6
py-4
text-center
text-sm
text-gray-500
"
    >
      <span>
        © {new Date().getFullYear()} University Attendance Management System
      </span>
    </footer>
  );
}
