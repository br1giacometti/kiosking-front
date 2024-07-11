export default function getMovementTypeColor(
  movementType?: "WITHDRAW" | "PAY" | "RENDITION" | "EXPENSE" | string
) {
  switch (movementType) {
    case "BUY": {
      return "green";
    }
    case "APLICATION": {
      return "yellow";
    }
    case "RENDITION": {
      return "red";
    }
    case "EXPENSE": {
      return "orange";
    }
    default: {
      return undefined;
    }
  }
}
