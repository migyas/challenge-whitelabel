import {defaultTheme} from '@/styles/themes/default';
import {Container} from './styles';

export default function SuspenseLoader() {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          strokeWidth="8"
          stroke={defaultTheme['yellow-500']}
          strokeDasharray="50.26548245743669 50.26548245743669"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </Container>
  );
}
