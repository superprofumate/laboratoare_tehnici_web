import styles from './button.module.scss'

export default function Button({
  design = "primary",
  label = "default button",
  onClick,
  disabled = false,
}) {
  const variant = styles[`button--${design}`] ?? styles["button--primary"];

  return (
    <button
      type="button"
      className={`text text--label ${styles.button} ${variant}`}
      onClick={!disabled && typeof onClick === "function" ? onClick : undefined}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}