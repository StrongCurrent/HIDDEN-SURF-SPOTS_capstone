import Circle from './style';

export default function LoadingSpinner() {
  return (
    <Circle>
      {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`sk-child sk-circle${i + 2}`} />)}
    </Circle>
  );
}
