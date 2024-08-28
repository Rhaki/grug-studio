interface PropsIcon {
  className?: string;
}

export function IconContract(props: PropsIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-8 w-8 ${props.className}`}
    >
      <path
        fillRule="evenodd"
        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
