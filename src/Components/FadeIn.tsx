import React, {
  useState,
  useRef,
  useEffect,
  FunctionComponent,
  ReactNode,
} from "react";
import "./FadeIn.css";

type Props = {
  children: ReactNode;
};

const FadeIn: FunctionComponent<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    observer.observe(cardRef.current);
    return () => observer.unobserve(cardRef.current);
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={cardRef}
    >
      {children}
    </div>
  );
};

export default FadeIn;
