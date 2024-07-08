export default function getMovementTypeColor(
  movementType?: "WITHDRAW" | "PAY" | "RENDITION" | "EXPENSE" | string
) {
  switch (movementType) {
    case "WITHDRAW": {
      return "red";
    }
    case "PAY": {
      return "yellow";
    }
    case "RENDITION": {
      return "green";
    }
    case "EXPENSE": {
      return "orange";
    }
    default: {
      return undefined;
    }
  }
}
