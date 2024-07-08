import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface StatusCardProps {
  label: string;
  value: React.ReactNode; // Cambia el tipo a React.ReactNode
}

const StatusCard = ({ label, value }: StatusCardProps) => (
  <Box border="1px solid" borderColor="gray.300" borderRadius="base" flex={1}>
    <p>
      <Stat p={5}>
        <StatLabel>{label}</StatLabel>
        <StatNumber mt={3}>{value}</StatNumber>
      </Stat>
    </p>
  </Box>
);

export default StatusCard;
