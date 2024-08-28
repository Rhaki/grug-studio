interface PropsIcon {
  className?: string;
}

export function IconDelete(props: PropsIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        fillRule="evenodd"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        clipRule="evenodd"
      />
    </svg>
  );
}