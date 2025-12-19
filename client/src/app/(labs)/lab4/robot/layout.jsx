import './robot-style-flex.css';
import './robot-style-grid.css';

export const metadata = {
  title: "Grumpy Robot"
}

export default function LayoutRobot({ children }) {
  return (
    <>
      {children}
    </>
  );
}