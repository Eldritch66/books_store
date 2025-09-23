import styles from "./BookLoader.module.css";

export default function BookLoader() {
  const items = Array.from({ length: 18 });

  return (
    <div className={styles.container}>
      <div className={styles.book}>
        <div className={styles.inner}>
          <div className={styles.left}></div>
          <div className={styles.middle}></div>
          <div className={styles.right}></div>
        </div>

        <ul>
          {items.map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
