export interface ButtonProps {
    children?: string;
    onClick: () => void;
    id: string;
    style?: {
      width?: string;
      height?: string;
      backgroundColor?: string;
      color?: string;
      borderRadius?: string;
      fontSize?: string;
      fontWeight?: string;
      margin?: string;
      padding?: string;
    };
    className?: string;
  }
  